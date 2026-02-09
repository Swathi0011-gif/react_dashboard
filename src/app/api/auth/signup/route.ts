import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
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
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
