'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
// We need to use server actions or just call signIn from next-auth/react (but client side)
// For NextAuth v5, it's often recommended to use server actions, but for simplicity here I'll use the API route via a custom fetch or import if possible.
// Actually, next-auth/react `signIn` works client side.
import { signIn } from 'next-auth/react';

function LoginForm() {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('Test123@123');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const authError = searchParams.get('error');

    // Friendly error messages for common NextAuth errors
    const getErrorMessage = (errCode: string | null) => {
        if (!errCode) return null;
        if (errCode === 'CredentialsSignin') return 'Invalid email or password';
        if (errCode === 'AccessDenied') return 'You need to be approved to access this content';
        return 'An error occurred during sign in. Please try again.';
    };

    const displayError = error || getErrorMessage(authError);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError('Invalid email or password');
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
                {message && <div className="p-2 text-sm text-green-700 bg-green-100 rounded text-center">{message}</div>}
                {displayError && <div className="p-2 text-sm text-red-700 bg-red-100 rounded text-center">{displayError}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
