import { getDb } from "@/lib/db";
import { getAuthEmail } from "@/lib/auth";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CartPage() {
    const email = await getAuthEmail();
    if (!email) {
        return <div className="container" style={{ textAlign: "center", marginTop: "4rem" }}><h1 className="page-title">Please Log In</h1><Link href="/login" className="btn-primary">Log In</Link></div>;
    }

    const db = await getDb();
    const carts = await db.collection("carts").find({ user_email: email }).toArray();
    const out = [];
    let total = 0;

    for (const c of carts) {
        const p = await db.collection("products").findOne({ _id: c.product_id });
        if (p) {
            out.push({
                cart_id: c._id.toString(),
                id: p._id.toString(),
                title: p.title,
                price: Number(p.price),
            });
            total += Number(p.price);
        }
    }

    return (
        <div>
            <h1 className="page-title">Your Cart</h1>
            <div className="glass-card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                {out.length === 0 ? (
                    <p style={{ textAlign: "center", opacity: 0.7 }}>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {out.map(item => (
                                <li key={item.cart_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{item.title}</h3>
                                        <div style={{ color: "#10b981", fontWeight: "600" }}>${item.price.toFixed(2)}</div>
                                    </div>
                                    <Link href={`/cart/remove?cart_id=${item.cart_id}`} className="btn-secondary" style={{ padding: "0.5rem", color: "#ef4444", borderColor: "rgba(239,68,68,0.2)" }}>
                                        <Trash2 size={18} /> Remove
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>Total: ${total.toFixed(2)}</div>
                            <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
