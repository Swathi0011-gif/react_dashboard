'use client';

import { SignUpForm } from '@/components/auth-ui';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left Side: White Background - Signup Form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-sm transition-all duration-700 ease-out">
                    <SignUpForm />
                </div>
            </div>

            {/* Right Side: Black Background - Branding/Visuals */}
            <div className="hidden md:flex w-1/2 bg-black items-center justify-center p-12 lg:p-24">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl mb-8 mx-auto flex items-center justify-center backdrop-blur-md border border-indigo-500/20 group">
                        <div className="w-8 h-8 bg-indigo-400 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                    </div>
                    <h2 className="text-5xl font-light text-white mb-6 tracking-tight leading-tight italic">Join the Innovation</h2>
                    <p className="text-gray-400 font-light text-lg leading-relaxed mb-12">
                        Create an account to join our high-performance infrastructure.
                        Awaiting administrator validation for secure onboarding.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-white font-bold mb-1 italic">99.9% Uptime</div>
                            <div className="text-gray-500 text-xs">Guaranteed system reliability</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-white font-bold mb-1 italic">End-to-End</div>
                            <div className="text-gray-500 text-xs">Encrypted protocol headers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
