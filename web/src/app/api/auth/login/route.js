import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db';
import { verifyPassword, makeToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        let email = '';
        let password = '';
        let redirectUrl = '/products';

        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const body = await request.json();
            email = body.email;
            password = body.password;
            if (body.redirect) redirectUrl = body.redirect;
        } else {
            const formData = await request.formData();
            email = formData.get('email');
            password = formData.get('password');
            if (formData.get('redirect')) redirectUrl = formData.get('redirect');
        }

        email = email?.toString().trim().toLowerCase();
        password = password?.toString();

        if (!email || !password) {
            return NextResponse.json({ error: 'Please enter both email and password.' }, { status: 400 });
        }

        const user = getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: 'No account found with this email. You can register or try our 1-click demo accounts below.' }, { status: 401 });
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Incorrect password. Please verify and try again.' }, { status: 401 });
        }

        const token = await makeToken(email);
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return NextResponse.json({
            ok: true,
            redirect: redirectUrl,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'A server error occurred during sign in. Please try again.' }, { status: 500 });
    }
}
