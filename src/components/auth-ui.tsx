'use client';

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLogOut, FiUserPlus, FiLogIn } from 'react-icons/fi';

/**
 * Login Form Component
 */
export function LoginForm({ message, error: initialError }: { message?: string | null, error?: string | null }) {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('Test123@123');
    const [error, setError] = useState(initialError || '');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                if (res.error === 'CredentialsSignin') {
                    setError('Invalid email or password');
                } else if (res.error === 'AccessDenied') {
                    setError('You need to be approved to access this content');
                } else {
                    setError('An error occurred during sign in. Please try again.');
                }
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md border border-gray-100">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>
                <p className="mt-2 text-sm text-gray-600">Access your dashboard</p>
            </div>

            {message && <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded text-center font-medium">{message}</div>}
            {error && <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded text-center font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : <><FiLogIn className="mr-2" /> Login</>}
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

/**
 * Sign Up Form Component
 */
export function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push('/login?message=Account created. Please wait for admin approval.');
            } else {
                const data = await res.json();
                setError(data.message || 'Something went wrong during signup.');
            }
        } catch (err) {
            setError('A network error occurred. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md border border-gray-100">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                <p className="mt-2 text-sm text-gray-600">Join our platform today</p>
            </div>

            {error && <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded text-center font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : <><FiUserPlus className="mr-2" /> Sign Up</>}
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}

/**
 * Sign Out Button Component
 */
export function SignOutButton({ className = "" }: { className?: string }) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${className}`}
        >
            <FiLogOut className="mr-2" />
            Sign Out
        </button>
    );
}
