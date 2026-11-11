import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/db';
import { hashPassword, makeToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        let fullName = '';
        let email = '';
        let password = '';
        let role = 'buyer';
        let redirectUrl = '/products';

        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const body = await request.json();
            fullName = body.full_name;
            email = body.email;
            password = body.password;
            if (body.role) role = body.role;
            if (body.redirect) redirectUrl = body.redirect;
        } else {
            const formData = await request.formData();
            fullName = formData.get('full_name');
            email = formData.get('email');
            password = formData.get('password');
            if (formData.get('role')) role = formData.get('role');
            if (formData.get('redirect')) redirectUrl = formData.get('redirect');
        }

        fullName = fullName?.toString().trim();
        email = email?.toString().trim().toLowerCase();
        password = password?.toString();

        if (!fullName || !email || !password) {
            return NextResponse.json({ error: 'Please provide your full name, email, and password.' }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
        }

        const existing = getUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: 'An account with this email address already exists. Please sign in instead.' }, { status: 409 });
        }

        const hashed = await hashPassword(password);
        const newUser = createUser({
            email,
            password: hashed,
            full_name: fullName,
            role,
            bio: role === 'seller'
                ? 'Artisan crafter dedicated to circular, zero-waste craftsmanship.'
                : 'Conscious consumer shopping mindfully for sustainable heirlooms.'
        });

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
                id: newUser?.id,
                email,
                full_name: fullName,
                role
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ error: 'A server error occurred while creating your account. Please try again.' }, { status: 500 });
    }
}
