import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { authConfig } from './auth.config';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Query database for user
                const result = await query('SELECT * FROM users WHERE email = $1', [email]);
                const user = result.rows[0];

                if (!user) return null;

                // Verify password
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) return null;

                // Return user object with approval status and role for session
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    is_approved: user.is_approved,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Store role and approval status in JWT
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.is_approved = user.is_approved;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass role and approval status to frontend session
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.is_approved = token.is_approved as boolean;
            }
            return session;
        },
    },
});
