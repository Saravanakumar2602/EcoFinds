import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function MyListingsPage() {
    const email = await getAuthEmail();
    if (!email) redirect('/login');

    const db = await getDb();

    const listings = await db.collection("products").find({ owner_email: email }).toArray();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>My Listings</h1>
                <Link href="/add-product" className="btn-primary">Add New Product</Link>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
                {listings.length === 0 ? <p style={{ opacity: 0.7, textAlign: 'center' }}>You haven't listed any products yet.</p> : (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {listings.map((l, i) => (
                            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{l.title}</h4>
                                    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{l.category}</span>
                                </div>
                                <div style={{ color: '#10b981', fontWeight: 600, fontSize: '1.2rem' }}>
                                    ${Number(l.price).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
