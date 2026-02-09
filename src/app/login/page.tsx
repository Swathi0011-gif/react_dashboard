'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth-ui';

function LoginContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const authError = searchParams.get('error');

    return (
        <div className="min-h-screen flex">
            {/* Left Side: White Background - Login Form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-sm">
                    <LoginForm message={message} error={authError} />
                </div>
            </div>

            {/* Right Side: Black Background - Branding/Visuals */}
            <div className="hidden md:flex w-1/2 bg-black items-center justify-center p-12 lg:p-24">
                <div className="max-w-md text-center transform scale-110">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl mb-8 mx-auto flex items-center justify-center backdrop-blur-md border border-white/5">
                        <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-5xl font-light text-white mb-6 tracking-tight leading-tight">Secure Access Portal</h2>
                    <p className="text-gray-400 font-light text-lg leading-relaxed">
                        Precision-engineered security for your digital ecosystem.
                        Sign in to monitor protocols and manage user access.
                    </p>
                    <div className="mt-12 flex justify-center gap-4">
                        <div className="h-1 w-12 bg-gray-800 rounded-full"></div>
                        <div className="h-1 w-12 bg-white rounded-full"></div>
                        <div className="h-1 w-12 bg-gray-800 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}

