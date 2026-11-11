import { getAuthUser } from "@/lib/auth";
import { getProductsByOwner, deleteProduct } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Trash2, ExternalLink, Package, Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyListingsPage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login?redirect=/my-listings");
    }

    const listings = getProductsByOwner(user.email);

    async function handleDelete(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) return;
        const prodId = Number(formData.get("product_id"));
        deleteProduct(prodId, currentUser.email);
        redirect("/my-listings");
    }

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
                flexWrap: "wrap",
                gap: "1.25rem"
            }}>
                <div>
                    <div className="section-label">
                        <Sparkles size={13} />
                        <span>Artisan & Maker Studio</span>
                    </div>
                    <h1 className="page-title" style={{ margin: 0 }}>My Listed Products</h1>
                    <p className="page-subtitle">
                        Manage your handcrafted sustainable inventory and monitor stock levels.
                    </p>
                </div>

                <Link href="/add-product" className="btn-primary">
                    <PlusCircle size={17} /> List New Item
                </Link>
            </div>

            {/* Listings Grid / Table */}
            {listings.length === 0 ? (
                <div style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-xl)",
                    padding: "clamp(3rem, 6vh, 4.5rem) 1.5rem",
                    textAlign: "center",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "var(--brand-accent-light)",
                        color: "var(--brand-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.25rem"
                    }}>
                        <Package size={30} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.4vw, 1.6rem)", marginBottom: "0.4rem" }}>
                        You have not published any items yet
                    </h3>
                    <p style={{ color: "var(--text-muted)", maxWidth: "440px", margin: "0 auto 1.5rem", fontSize: "0.92rem" }}>
                        Start offering your upcycled crafts, organic textiles, or zero-waste creations to our community.
                    </p>
                    <Link href="/add-product" className="btn-primary">
                        Publish Your First Product <ArrowRight size={17} />
                    </Link>
                </div>
            ) : (
                <div style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-xl)",
                    padding: "clamp(1.25rem, 3vw, 2rem)",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--border-light)", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <span style={{ fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)" }}>
                            Active Inventory ({listings.length})
                        </span>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-subtle)" }}>
                            Studio: <strong>{user.email}</strong>
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {listings.map(item => (
                            <div key={item.id} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1rem clamp(0.75rem, 2vw, 1.25rem)",
                                background: "var(--bg-surface-alt)",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--border-light)",
                                flexWrap: "wrap"
                            }}>
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        objectFit: "cover",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--border-light)",
                                        flexShrink: 0
                                    }}
                                />

                                <div style={{ flex: "1 1 200px", minWidth: "160px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--brand-warm)" }}>
                                            {item.category}
                                        </span>
                                        <span className="badge-pill badge-green" style={{ fontSize: "0.65rem" }}>
                                            {item.eco_badge}
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", fontWeight: 700, marginBottom: "0.2rem" }}>
                                        <Link href={`/products/${item.id}`} style={{ color: "var(--text-main)" }}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                        Condition: <strong>{item.condition}</strong> • In Stock: <strong>{item.stock}</strong>
                                    </div>
                                </div>

                                <div style={{ textAlign: "right", marginLeft: "auto", flexShrink: 0 }}>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                                        ${Number(item.price).toFixed(2)}
                                    </div>
                                    {item.original_price && (
                                        <div style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "var(--text-subtle)" }}>
                                            ${Number(item.original_price).toFixed(2)}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                                    <Link
                                        href={`/products/${item.id}`}
                                        className="btn-secondary btn-sm"
                                        title="View Live Listing"
                                    >
                                        <ExternalLink size={13} /> View
                                    </Link>

                                    <form action={handleDelete}>
                                        <input type="hidden" name="product_id" value={item.id} />
                                        <button
                                            type="submit"
                                            className="btn-secondary btn-sm"
                                            style={{ color: "#EF4444", borderColor: "#FCA5A5" }}
                                            title="Delete product"
                                        >
                                            <Trash2 size={13} /> Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
