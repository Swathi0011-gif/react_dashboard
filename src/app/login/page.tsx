'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth-ui';

function LoginContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const authError = searchParams.get('error');

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <LoginForm message={message} error={authError} />
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

