import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        error: '/login', // Redirect errors back to login to handle them ourselves
    },
    session: {
        strategy: 'jwt',
    },
    providers: [], // Providers are configured in auth.ts
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isApproved = auth?.user?.is_approved;

            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnPending = nextUrl.pathname === '/pending';
            const isOnLogin = nextUrl.pathname === '/login';
            const isOnSignup = nextUrl.pathname === '/signup';

            // If not logged in, allow login/signup but protect dashboard/admin/pending
            if (!isLoggedIn) {
                if (isOnDashboard || isOnAdmin || isOnPending) {
                    return false; // Redirect to login
                }
                return true;
            }

            // If logged in but NOT approved
            if (isLoggedIn && !isApproved) {
                if (isOnPending) return true; // Already on pending page
                return Response.redirect(new URL('/pending', nextUrl));
            }

            // If logged in AND approved
            if (isLoggedIn && isApproved) {
                if (isOnPending || isOnLogin || isOnSignup) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }

                // Admin page protection
                if (isOnAdmin && auth.user.role !== 'admin') {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }

                return true;
            }

            return true;
        },
    },
} satisfies NextAuthConfig;

