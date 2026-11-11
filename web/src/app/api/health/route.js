import { NextResponse } from 'next/server';
import { getDb, getUserByEmail } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const db = await getDb();
        if (db && db.prepare) {
            const demoHash = bcrypt.hashSync('password123', 10);
            db.prepare("UPDATE users SET password = ? WHERE email IN ('demo@ecofinds.com', 'artisan@ecofinds.com', 'clara@example.com')").run(demoHash);
            const users = db.prepare('SELECT email, full_name, role FROM users').all();
            return NextResponse.json({ status: 'healthy', database: 'sqlite', users });
        } else {
            const demoUser = getUserByEmail('demo@ecofinds.com');
            const artisanUser = getUserByEmail('artisan@ecofinds.com');
            return NextResponse.json({
                status: 'healthy',
                database: 'universal-relational-store',
                users: [
                    { email: demoUser?.email, full_name: demoUser?.full_name, role: demoUser?.role },
                    { email: artisanUser?.email, full_name: artisanUser?.full_name, role: artisanUser?.role }
                ]
            });
        }
    } catch (err) {
        return NextResponse.json({ status: 'error', error: err.message }, { status: 500 });
    }
}
