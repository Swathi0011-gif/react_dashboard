'use client';

import { SignOutButton } from '@/components/auth-ui';
import { FiClock } from 'react-icons/fi';

export default function PendingApproval() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center border border-gray-100">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <FiClock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Pending Approval</h2>
                    <p className="text-gray-600 mb-8">
                        Your account has been created successfully, but it's currently awaiting approval from an administrator.
                        You will be able to access the dashboard once your account is activated.
                    </p>
                    <div className="space-y-4">
                        <SignOutButton className="w-full" />
                        <p className="text-xs text-gray-400">
                            Check back soon! If you think this is a mistake, please contact your administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
