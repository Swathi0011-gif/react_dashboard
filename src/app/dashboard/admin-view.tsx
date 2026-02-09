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
                setUsers(users.map(u => u.id === userId ? { ...u, is_approved: true } : u));
            }
        } catch (error) {
            console.error('Failed to approve user', error);
        }
    };

    const rejectUser = async (userId: number) => {
        if (!confirm('Are you sure you want to reject and delete this user request?')) return;

        try {
            const res = await fetch(`/api/admin/users?userId=${userId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== userId));
            }
        } catch (error) {
            console.error('Failed to reject user', error);
        }
    };

    if (loading) return (
        <div className="flex justify-start items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl space-y-4">
            <div className="flex justify-between items-end">
                <h3 className="text-xl font-medium text-gray-800">User Management</h3>
                <button
                    onClick={fetchUsers}
                    className="text-gray-400 hover:text-gray-700 text-xs transition-colors"
                >
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-400">No users found.</td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm text-gray-800 border-b border-gray-800 pb-0.5">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${user.is_approved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {user.is_approved ? 'Approved' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right space-x-3">
                                        {!user.is_approved && user.role !== 'admin' && (
                                            <>
                                                <button
                                                    onClick={() => approveUser(user.id)}
                                                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectUser(user.id)}
                                                    className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-wider"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {user.role === 'admin' && (
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">System</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
