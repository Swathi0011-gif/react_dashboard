'use client';

import { useState, useEffect } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    is_approved: boolean;
    created_at: string;
};

export default function AdminView() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const approveUser = async (userId: number) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            if (res.ok) {
                // Refresh list locally or refetch
                setUsers(users.map(u => u.id === userId ? { ...u, is_approved: true } : u));
            }
        } catch (error) {
            console.error('Failed to approve user', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Approve pending users.</p>
            </div>
            <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <li key={user.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400">Role: {user.role} | Status: {user.is_approved ? 'Approved' : 'Pending'}</p>
                            </div>
                            {!user.is_approved && user.role !== 'admin' && (
                                <button
                                    onClick={() => approveUser(user.id)}
                                    className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    Approve
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
