import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
    const email = await getAuthEmail();
    if (!email) redirect('/login');

    const db = await getDb();
    const carts = await db.collection("carts").find({ user_email: email }).toArray();

    if (carts.length === 0) {
        redirect('/cart');
    }

    async function processCheckout() {
        "use server";
        const email = await getAuthEmail();
        const db = await getDb();

        const carts = await db.collection("carts").find({ user_email: email }).toArray();
        for (const c of carts) {
            await db.collection("purchases").insertOne({
                user_email: email,
                product_id: c.product_id,
                date: new Date()
            });
        }
        await db.collection("carts").deleteMany({ user_email: email });
        redirect("/profile");
    }

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
            <h1 className="page-title">Secure Checkout</h1>
            <div className="glass-card" style={{ padding: '2rem' }}>
                <p style={{ margin: '1rem 0' }}>You have {carts.length} items to checkout. Do you want to confirm your purchase?</p>
                <form action={processCheckout}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: '#10b981' }}>
                        Confirm Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}
