import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipesRouter from './routes/routes';

interface AppError extends Error {
  status: number
}

export const app = express();

// Enable CORS
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
app.use(bodyParser.json());

// Define routes
app.use('api/v1/recipes', recipesRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as AppError;
  err.status = 404;
  next(err);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status === 404 ? 404 : 500);
  res.send({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});
