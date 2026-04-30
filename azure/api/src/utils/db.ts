import { Pool } from 'pg';

// Database configuration from environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false // Required for Azure PostgreSQL in most default configs
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
