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

        // Seed default admin user
        const adminEmail = 'test@test.com';
        const adminPassword = 'Test123@123';
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        console.log(`Checking if admin user ${adminEmail} exists...`);
        const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);

        if (userCheck.rows.length === 0) {
            console.log('Seeding admin user...');
            await pool.query(
                'INSERT INTO users (name, email, password, role, is_approved) VALUES ($1, $2, $3, $4, $5)',
                ['Admin User', adminEmail, hashedPassword, 'admin', true]
            );
            console.log('Admin user seeded successfully.');
        } else {
            console.log('Admin user already exists. Updating password and ensuring admin role...');
            await pool.query(
                'UPDATE users SET password = $1, role = $2, is_approved = $3 WHERE email = $4',
                [hashedPassword, 'admin', true, adminEmail]
            );
            console.log('Admin user updated successfully.');
        }

    } catch (error) {
        console.error('Error during setup:', error);
    } finally {
        await pool.end();
    }
}

runMigration();
