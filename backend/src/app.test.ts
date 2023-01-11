import request from 'supertest';
import { app } from './app';

describe('app', () => {
  it('should handle 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });
});





