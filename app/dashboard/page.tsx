import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminView from './admin-view';
import UserView from './user-view';

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                </div>
            </div>

            {session.user.role === 'admin' ? (
                <AdminView />
            ) : (
                <UserView user={session.user} />
            )}
        </div>
    );
}
