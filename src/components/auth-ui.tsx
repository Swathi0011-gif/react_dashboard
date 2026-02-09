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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="w-full space-y-8">
            <div className="text-left">
                <h2 className="text-4xl font-medium text-gray-800 tracking-tight">Login</h2>
                <p className="mt-3 text-gray-500 font-light">Access your workspace and dashboard</p>
            </div>

            {message && <div className="p-4 text-sm text-green-600 bg-green-50 border-l-4 border-green-500 rounded font-medium">{message}</div>}
            {error && <div className="p-4 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 rounded font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-gray-800 bg-transparent transition-colors text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-gray-800 bg-transparent transition-colors text-gray-800"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all flex justify-center items-center shadow-lg shadow-black/10 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : <><FiLogIn className="mr-2" /> Continue</>}
                </button>
            </form>
            <p className="text-center text-sm text-gray-500">
                New here?{' '}
                <Link href="/signup" className="text-gray-900 font-bold hover:underline decoration-2 underline-offset-4">
                    Create account
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
        <div className="w-full space-y-8">
            <div className="text-left">
                <h2 className="text-4xl font-medium text-gray-800 tracking-tight">Register</h2>
                <p className="mt-3 text-gray-500 font-light">Join our exclusive platform</p>
            </div>

            {error && <div className="p-4 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 rounded font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-gray-800 bg-transparent transition-colors text-gray-800"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-gray-800 bg-transparent transition-colors text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-gray-800 bg-transparent transition-colors text-gray-800"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all flex justify-center items-center shadow-lg shadow-black/10 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : <><FiUserPlus className="mr-2" /> Sign Up</>}
                </button>
            </form>
            <p className="text-center text-sm text-gray-500">
                Already registered?{' '}
                <Link href="/login" className="text-gray-900 font-bold hover:underline decoration-2 underline-offset-4">
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
