import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export const client = new Client({
  connectionString,
});

export function connect(): Promise<void> {
  return client.connect();
}

export function query(text: string, params?: any[]): Promise<any> {
  return client.query(text, params);
}

export function close(): Promise<void> {
  return client.end();
}
