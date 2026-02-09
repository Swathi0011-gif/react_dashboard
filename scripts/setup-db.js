const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not defined in .env.local');
    console.log('Please create .env.local and add your Neon DB connection string.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function runMigration() {
    try {
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema migration...');
        await pool.query(schemaSql);
        console.log('Schema migration completed successfully.');

        // Check if we need to seed an admin (optional)
        // For now, we'll let the user sign up and then manually update the DB or use a seed command.

    } catch (error) {
        console.error('Error running migration:', error);
    } finally {
        await pool.end();
    }
}

runMigration();
