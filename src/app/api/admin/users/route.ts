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
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
    } catch (error) {
        console.error('Error approving user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
