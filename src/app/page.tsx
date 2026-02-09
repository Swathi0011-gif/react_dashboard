import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex">
            {/* Left Side: White Background - Entry Options */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-12 md:p-24">
                <div className="max-w-sm w-full space-y-12">
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-gray-900"></div>
                        <h1 className="text-6xl font-medium text-gray-900 tracking-tighter">PROTO-DASH</h1>
                        <p className="text-gray-500 font-light leading-relaxed">
                            Next-generation administrative ecosystem. Secure. Scalable. Intelligent.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/login"
                            className="w-full py-5 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all flex justify-center items-center shadow-2xl shadow-black/20 group"
                        >
                            Enter System <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="/signup"
                            className="w-full py-5 bg-transparent border-2 border-gray-100 text-gray-400 font-bold rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all flex justify-center items-center"
                        >
                            Request Access
                        </Link>
                    </div>

                    <div className="pt-12 text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-4">
                        <span className="flex-1 h-px bg-gray-100"></span>
                        v1.0.4-production
                        <span className="flex-1 h-px bg-gray-100"></span>
                    </div>
                </div>
            </div>

            {/* Right Side: Black Background - Immersive Visuals */}
            <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#111_0%,#000_100%)]"></div>
                <div className="max-w-md text-center relative z-10 p-12">
                    <div className="mb-12 relative">
                        <div className="w-32 h-32 border border-white/10 rounded-3xl absolute -top-4 -left-4 animate-spin-slow"></div>
                        <div className="w-32 h-32 border border-white/5 rounded-3xl absolute top-4 left-4 animate-reverse-spin-slow"></div>
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-black border border-white/10 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-3xl shadow-2xl">
                            <div className="text-white text-4xl font-light italic">P</div>
                        </div>
                    </div>
                    <h2 className="text-4xl font-light text-white mb-6 tracking-tight italic">Uncompromising Integrity</h2>
                    <p className="text-gray-500 font-light leading-relaxed">
                        Engineered with advanced role-based protocols and isolated data environments.
                        Your gateway to centralized intelligence.
                    </p>
                </div>

                {/* Decorative dots grid */}
                <div className="absolute bottom-0 right-0 p-8 grid grid-cols-4 gap-2 opacity-20">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes reverse-spin-slow {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
                .animate-reverse-spin-slow {
                    animation: reverse-spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
