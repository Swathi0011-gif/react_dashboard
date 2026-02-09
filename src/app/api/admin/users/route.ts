import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await query('SELECT id, name, email, role, is_approved, created_at FROM users ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message,
            hint: 'Ensure DATABASE_URL is correct and the users table exists.'
        }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ message: 'User ID required' }, { status: 400 });
        }

        await query('UPDATE users SET is_approved = TRUE WHERE id = $1', [userId]);

        return NextResponse.json({ message: 'User approved' });
    } catch (error: any) {
        console.error('Error approving user:', error);
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message,
            hint: 'Ensure DATABASE_URL is correct and the users table exists.'
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'User ID required' }, { status: 400 });
        }

        await query('DELETE FROM users WHERE id = $1 AND role != \'admin\'', [userId]);

        return NextResponse.json({ message: 'User request rejected/deleted' });
    } catch (error: any) {
        console.error('Error rejecting user:', error);
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message,
            hint: 'Ensure DATABASE_URL is correct and the users table exists.'
        }, { status: 500 });
    }
}
