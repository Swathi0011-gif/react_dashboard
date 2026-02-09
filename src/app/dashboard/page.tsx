import { auth } from '@/auth';
import AdminView from './admin-view';
import UserView from './user-view';
import { SignOutButton } from '@/components/auth-ui';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) return null;

    return (
        <div className="min-h-screen flex">
            {/* Left Side: White Background */}
            <div className="w-1/2 bg-white min-h-screen p-8 flex flex-col items-start space-y-8">
                <div>
                    <h1 className="text-3xl font-medium text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                        Welcome, {session.user.email}
                    </h1>
                </div>

                <div className="w-full">
                    {session.user.role === 'admin' ? (
                        <AdminView />
                    ) : (
                        <UserView user={session.user} />
                    )}
                </div>

                <div className="mt-auto pt-8">
                    <SignOutButton className="bg-gray-800 hover:bg-black" />
                </div>
            </div>

            {/* Right Side: Black Background */}
            <div className="w-1/2 bg-black min-h-screen">
                {/* Decorative or future content area as per image */}
            </div>
        </div>
    );
}

