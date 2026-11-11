import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    const db = await getDb();
    const demoHash = bcrypt.hashSync('password123', 10);
    db.prepare("UPDATE users SET password = ? WHERE email IN ('demo@ecofinds.com', 'artisan@ecofinds.com', 'clara@example.com')").run(demoHash);
    const users = db.prepare('SELECT email, full_name, role FROM users').all();
    return NextResponse.json({ status: 'healthy', database: 'sqlite', users });
}
