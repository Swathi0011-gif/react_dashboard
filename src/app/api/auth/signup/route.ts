import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // 1. Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields', error: 'Name, email, and password are all required.' },
                { status: 400 }
            );
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email format', error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // 3. Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password too short', error: 'Password must be at least 6 characters long.' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user (default role: user, is_approved: false)
        const result = await query(
            'INSERT INTO users (name, email, password, role, is_approved) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email',
            [name, email, hashedPassword, 'user', false]
        );

        return NextResponse.json(
            { message: 'User created successfully', user: result.rows[0] },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                error: error.message,
                hint: 'Ensure DATABASE_URL is correct and the users table exists.'
            },
            { status: 500 }
        );
    }
}
