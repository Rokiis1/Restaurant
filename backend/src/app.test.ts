import request from 'supertest';
import { app } from './app';

describe('app', () => {
    it('should handle 404', async () => {
        const response = await request(app).get('/invalid-url');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found');
    });

    it('should handle errors', async () => {
        const spyNext = jest.fn();
        const error = new Error('Test Error');
        app.use((err: any, req: any, res: any, next: any) => {
            spyNext(err);
            next(err);
        });
        const response = await request(app).get('/');
        expect(spyNext).toHaveBeenCalledWith(error);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Test Error');
    });
});
