import { getDb } from "@/lib/db";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const db = await getDb();
    const rawProducts = await db.collection("products").find({}).sort({ _id: -1 }).toArray();

    const products = rawProducts.map(p => ({
        id: p._id.toString(),
        title: p.title,
        description: p.description || "",
        category: p.category,
        price: p.price,
        image: p.image && !p.image.includes('placeholder') ? p.image : null
    }));

    // Helper for beautiful gradients based on string hash
    function getGradient(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c1 = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        const c2 = ((hash >> 8) & 0x00FFFFFF).toString(16).toUpperCase();
        return `linear-gradient(135deg, #${"000000".substring(0, 6 - c1.length) + c1}, #${"000000".substring(0, 6 - c2.length) + c2})`;
    }

    if (products.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h1 className="page-title">Marketplace</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>No products found yet. Be the first to list one!</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title">Marketplace</h1>
            <div className="grid-products">
                {products.map(product => (
                    <div key={product.id} className="glass-card product-card">
                        {product.image ? (
                            <img src={product.image} alt={product.title} className="product-image" />
                        ) : (
                            <div className="product-image-placeholder" style={{ background: getGradient(product.id + product.title) }}>
                                <span>{product.category || 'Product'}</span>
                            </div>
                        )}
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-desc">{product.description.substring(0, 60)}...</p>
                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="product-price">${Number(product.price).toFixed(2)}</span>
                                <Link href={`/cart/add?id=${product.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                    <ShoppingCart size={18} /> Add
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .product-desc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }
        .product-image-placeholder {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.8;
        }
      `}</style>
        </div>
    );
}
