import { signOut } from '@/auth';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}

