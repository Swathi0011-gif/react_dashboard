import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-24 text-white">
            <h1 className="text-5xl font-bold mb-8">React Dashboard</h1>
            <p className="text-xl mb-12 max-w-2xl text-center">
                A secure, role-based dashboard with admin approval workflow.
                Built with Next.js, Neon DB, and NextAuth.
            </p>

            <div className="flex gap-6">
                <Link
                    href="/login"
                    className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-opacity-90 transition shadow-lg"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-8 py-3 bg-transparent border-2 border-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition shadow-lg"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
