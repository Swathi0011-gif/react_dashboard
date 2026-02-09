import { auth } from '@/auth';
import AdminView from '@/app/dashboard/admin-view';
import { SignOutButton } from '@/components/auth-ui';
import { redirect } from 'next/navigation';

export default async function AdminRequestsPage() {
    const session = await auth();

    // Protection: only admins can access this page
    if (!session?.user || session.user.role !== 'admin') {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side: White Background - Management Interface */}
            <div className="w-1/2 bg-white min-h-screen p-8 flex flex-col items-start space-y-8 overflow-y-auto">
                <div>
                    <h1 className="text-3xl font-medium text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                        Welcome, {session.user.email}
                    </h1>
                </div>

                <div className="w-full">
                    <AdminView />
                </div>

                <div className="mt-auto pt-8">
                    <SignOutButton className="bg-gray-800 hover:bg-black" />
                </div>
            </div>

            {/* Right Side: Black Background - Decorative/Branding */}
            <div className="w-1/2 bg-black min-h-screen flex items-center justify-center p-12">
                <div className="max-w-md text-center">
                    <h2 className="text-4xl font-light text-white mb-4 tracking-tight">Admin Control Panel</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Managing access and security protocols for the dashboard ecosystem.
                        Review pending requests to grant platform access.
                    </p>
                </div>
            </div>
        </div>
    );
}
