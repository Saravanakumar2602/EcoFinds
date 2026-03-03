import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { verifyPassword, makeToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function LoginPage() {
    async function loginAction(formData) {
        "use server";
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) return;

        const db = await getDb();
        const user = await db.collection("users").findOne({ email });
        if (!user || !(await verifyPassword(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const token = await makeToken(email);
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, { httpOnly: true, path: "/" });

        redirect("/products");
    }

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <h1 className="page-title">Welcome Back</h1>
            <form action={loginAction} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label className="input-label">Email</label>
                    <input name="email" type="email" required className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                    <label className="input-label">Password</label>
                    <input name="password" type="password" required className="input-field" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Log In
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                    Don't have an account? <Link href="/signup" style={{ color: '#10b981' }}>Sign up</Link>
                </p>
            </form>
        </div>
    );
}
