import { auth } from '@/auth';
import AdminView from './admin-view';
import UserView from './user-view';
import { SignOutButton } from '@/components/auth-ui';

/**
 * Dashboard page.
 * Access is strictly controlled by middleware (/src/middleware.ts and /src/auth.config.ts).
 * Unauthenticated users are redirected to /login.
 * Unapproved users are redirected to /pending.
 */
export default async function DashboardPage() {
    const session = await auth();

    // Redundant guard; middleware already protects this route.
    if (!session?.user) return null;

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between bg-white p-6 shadow sm:rounded-lg">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-indigo-600">
                        {session.user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <SignOutButton />
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
