import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProfilePage() {
    const email = await getAuthEmail();
    if (!email) redirect('/login');

    const db = await getDb();

    const purchasesCursor = await db.collection("purchases").find({ user_email: email }).toArray();
    const purchases = [];
    for (const p of purchasesCursor) {
        const pt = await db.collection("products").findOne({ _id: p.product_id });
        if (pt) purchases.push(pt);
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title">My Profile</h1>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Account Details</h2>
                <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Logged in as: <strong>{email}</strong></p>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Order History</h3>
                {purchases.length === 0 ? <p style={{ opacity: 0.7, marginBottom: '2rem' }}>No purchases yet.</p> : (
                    <ul style={{ marginBottom: '2rem' }}>
                        {purchases.map((pc, i) => (
                            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
                                <span>{pc.title}</span>
                                <span style={{ color: '#10b981', fontWeight: 600 }}>${Number(pc.price).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                    <a href="/api/auth/logout" className="btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>Sign Out</a>
                    <Link href="/add-product" className="btn-primary">Sell a Product</Link>
                </div>
            </div>
        </div>
    );
}
