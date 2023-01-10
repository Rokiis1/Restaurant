import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export const client = new Client({
  connectionString
});

export async function connect(): Promise<void> {
  try {
    await client.connect();
  } catch (error: any) {
    console.error(error.stack);
  }
}

export async function query(text: string, params?: any[]): Promise<any> {
  try {
    return await client.query(text, params);
  } catch (error: any) {
    console.error(error.stack);
  }
}

export async function close(): Promise<void> {
  try {
    await client.end();
  } catch (error: any) {
    console.error(error.stack);
  }
}
