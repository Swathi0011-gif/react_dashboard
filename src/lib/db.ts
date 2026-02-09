import { Pool } from 'pg';

const dbUrl = process.env.DATABASE_URL;
const isPlaceholder = !dbUrl || dbUrl.includes('user:password') || dbUrl.includes('host:port');

if (isPlaceholder) {
  console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: DATABASE_URL is not configured.');
  console.error('\x1b[33m%s\x1b[0m', 'Please update .env.local with your Neon connection string.');
  throw new Error('Database not configured. Please add your Neon DATABASE_URL to .env.local');
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;

export const query = async (text: string, params?: any[]) => {
  // The check for isPlaceholder is now done at the top level, so this specific check is redundant
  // if the application exits on placeholder. However, if the application were to continue
  // with a dummy connection, this check would still be useful for individual queries.
  // Given the new behavior of throwing an error at startup, this block can be simplified.
  return pool.query(text, params);
};
