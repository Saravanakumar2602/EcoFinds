import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';

export default async function AddProductPage() {
    const email = await getAuthEmail();
    if (!email) redirect('/login');

    async function addProductAction(formData) {
        "use server";
        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");
        const price = formData.get("price");

        if (!title || !price) return;

        const db = await getDb();
        const emailStr = await getAuthEmail();
        await db.collection("products").insertOne({
            title,
            description,
            category,
            price: parseFloat(price),
            owner_email: emailStr
        });

        redirect("/products");
    }

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto' }}>
            <h1 className="page-title">List a New Product</h1>
            <form action={addProductAction} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label className="input-label">Product Title</label>
                    <input name="title" type="text" required className="input-field" placeholder="Bamboo Toothbrush" />
                </div>
                <div>
                    <label className="input-label">Category</label>
                    <select name="category" required className="input-field" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <option value="Home">Home</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Price ($)</label>
                    <input name="price" type="number" step="0.01" required className="input-field" placeholder="9.99" />
                </div>
                <div>
                    <label className="input-label">Description</label>
                    <textarea name="description" required className="input-field" placeholder="100% biodegradable materials..." rows="4" />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Publish Product
                </button>
            </form>
        </div>
    );
}
