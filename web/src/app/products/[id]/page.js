import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getProductById, getProductReviews, addReview, getUserByEmail, addToCart } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Star, ShieldCheck, TreePine, Package, ArrowLeft, ShoppingBag, CheckCircle, Leaf, Sparkles, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = getProductById(Number(id));

    if (!product) {
        notFound();
    }

    const reviews = getProductReviews(Number(id));
    const user = await getAuthUser();
    const seller = getUserByEmail(product.owner_email);

    async function handleAddToCart(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) redirect(`/login?redirect=/products/${id}`);
        const qty = parseInt(formData.get("quantity") || "1", 10);
        addToCart(currentUser.email, product.id, qty);
        redirect("/cart");
    }

    async function handleAddReview(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) redirect(`/login?redirect=/products/${id}`);

        const rating = parseInt(formData.get("rating") || "5", 10);
        const comment = formData.get("comment");

        if (!comment || comment.trim() === "") return;

        addReview({
            productId: product.id,
            userEmail: currentUser.email,
            userName: currentUser.full_name,
            rating,
            comment: comment.trim()
        });

        redirect(`/products/${product.id}#reviews`);
    }

    const discountPercent = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : null;

    return (
        <div>
            {/* Breadcrumb Navigation */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.82rem",
                color: "var(--text-subtle)",
                marginBottom: "clamp(1rem, 2vh, 1.75rem)",
                flexWrap: "wrap"
            }}>
                <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
                <span>/</span>
                <Link href="/products" style={{ color: "var(--text-muted)" }}>Marketplace</Link>
                <span>/</span>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} style={{ color: "var(--text-muted)" }}>{product.category}</Link>
                <span>/</span>
                <span style={{ color: "var(--text-main)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "240px" }}>{product.title}</span>
            </div>

            {/* Main Product Layout */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "clamp(1.75rem, 3.5vw, 3.5rem)",
                alignItems: "flex-start",
                marginBottom: "clamp(2.5rem, 5vh, 4rem)"
            }}>
                {/* Left: Gallery & Eco Card */}
                <div>
                    <div style={{
                        position: "relative",
                        borderRadius: "var(--radius-xl)",
                        overflow: "hidden",
                        border: "1px solid var(--border-light)",
                        boxShadow: "var(--shadow-md)",
                        background: "var(--bg-surface-alt)",
                        marginBottom: "1.25rem",
                        height: "clamp(240px, 38vh, 420px)"
                    }}>
                        <img
                            src={product.image_url}
                            alt={product.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div style={{ position: "absolute", top: "0.85rem", left: "0.85rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                            <span className="badge-pill badge-green" style={{ fontSize: "0.78rem" }}>
                                {product.eco_badge}
                            </span>
                            <span className="badge-pill badge-clay" style={{ fontSize: "0.78rem" }}>
                                {product.condition}
                            </span>
                        </div>
                    </div>

                    {/* Sustainability Profile Card */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "clamp(1rem, 2vw, 1.25rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.85rem" }}>
                            <Leaf size={16} color="var(--brand-primary)" />
                            <h4 style={{ fontSize: "0.88rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-primary)" }}>
                                Eco-Impact Specifications
                            </h4>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                                <span style={{ color: "var(--text-muted)" }}>Carbon Diverted:</span>
                                <strong style={{ color: "var(--brand-accent)" }}>-{product.carbon_saved_kg || 2.1} kg CO₂ eq</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                                <span style={{ color: "var(--text-muted)" }}>Raw Materials:</span>
                                <strong>{product.materials || "Organic / Natural"}</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                                <span style={{ color: "var(--text-muted)" }}>Packaging:</span>
                                <strong>100% Compostable Cornstarch</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-muted)" }}>Shipping:</span>
                                <strong>Carbon-Neutral Certified</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Product Buy Info */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--brand-warm)" }}>
                            {product.category}
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)",
                        fontWeight: 700,
                        color: "var(--text-main)",
                        lineHeight: 1.25,
                        marginBottom: "0.75rem"
                    }}>
                        {product.title}
                    </h1>

                    {/* Star Rating & Reviews anchor */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                        <div className="star-rating" style={{ fontSize: "0.95rem" }}>
                            <Star size={16} fill="#F59E0B" color="#F59E0B" />
                            <strong style={{ marginLeft: "0.2rem", color: "var(--text-main)" }}>{product.rating}</strong>
                            <span>({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
                        </div>
                        <a href="#reviews" style={{ fontSize: "0.82rem", color: "var(--brand-primary)", textDecoration: "underline", fontWeight: 600 }}>
                            Read Customer Reviews
                        </a>
                    </div>

                    {/* Price Block */}
                    <div style={{
                        background: "var(--bg-surface-alt)",
                        padding: "clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.85rem",
                        marginBottom: "1.5rem",
                        border: "1px solid var(--border-light)",
                        flexWrap: "wrap"
                    }}>
                        <span style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.1rem)", fontWeight: 800, color: "var(--brand-primary)" }}>
                            ${Number(product.price).toFixed(2)}
                        </span>
                        {product.original_price && (
                            <>
                                <span style={{ fontSize: "1rem", textDecoration: "line-through", color: "var(--text-subtle)", fontWeight: 500 }}>
                                    ${Number(product.original_price).toFixed(2)}
                                </span>
                                <span className="badge-pill badge-clay" style={{ fontSize: "0.75rem" }}>
                                    Save {discountPercent}%
                                </span>
                            </>
                        )}
                        <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            Taxes included
                        </span>
                    </div>

                    {/* Product Story */}
                    <div style={{ marginBottom: "1.75rem" }}>
                        <h3 style={{ fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                            Artisan Note & Narrative
                        </h3>
                        <p style={{ fontSize: "0.98rem", lineHeight: 1.65, color: "var(--text-main)" }}>
                            {product.description}
                        </p>
                    </div>

                    {/* Inventory Status */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem", fontSize: "0.85rem", flexWrap: "wrap" }}>
                        <CheckCircle size={15} color="var(--brand-accent)" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 600, color: "var(--brand-accent)" }}>
                            In Stock ({product.stock} units available)
                        </span>
                        <span style={{ color: "var(--text-subtle)" }}>— Ready for plastic-free shipping</span>
                    </div>

                    {/* Add to Cart Form */}
                    <form action={handleAddToCart} style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "clamp(1rem, 2vw, 1.25rem)",
                        boxShadow: "var(--shadow-sm)",
                        marginBottom: "1.75rem"
                    }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>
                                    Qty
                                </label>
                                <select
                                    name="quantity"
                                    defaultValue="1"
                                    className="input-field"
                                    style={{ width: "75px", padding: "0.5rem 0.6rem", fontWeight: 700 }}
                                >
                                    {[1, 2, 3, 4, 5, 8, 10].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ flex: 1, minWidth: "180px", padding: "0.85rem 1.25rem", fontSize: "1rem" }}
                            >
                                <ShoppingBag size={18} /> Add to Cart • ${Number(product.price).toFixed(2)}
                            </button>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.5rem", flexWrap: "wrap" }}>
                            <span>🌿 Carbon-Neutral Delivery</span>
                            <span>•</span>
                            <span>📦 30-Day Mindful Returns</span>
                        </div>
                    </form>

                    {/* Maker Card */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.85rem",
                        padding: "1rem",
                        background: "var(--bg-surface-alt)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--border-light)"
                    }}>
                        <img
                            src={seller?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(product.owner_email)}`}
                            alt={seller?.full_name || product.owner_email}
                            style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                                <strong style={{ fontSize: "0.95rem" }}>{seller?.full_name || "Artisan Maker"}</strong>
                                <span className="badge-pill badge-green" style={{ fontSize: "0.68rem" }}>Verified Artisan</span>
                            </div>
                            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                {seller?.bio || "Verified sustainable craftsman on EcoFinds."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <section id="reviews" style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                boxShadow: "var(--shadow-sm)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "1.25rem" }}>
                    <div>
                        <div className="section-label">
                            <MessageSquare size={13} />
                            <span>Verified Feedback</span>
                        </div>
                        <h2 className="page-title" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", margin: 0 }}>
                            Customer Experiences ({reviews.length})
                        </h2>
                    </div>

                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--brand-primary)" }}>{product.rating} / 5.0</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>Overall Satisfaction</div>
                    </div>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                    gap: "clamp(1.5rem, 3vw, 2.5rem)",
                    alignItems: "flex-start"
                }}>
                    {/* Reviews List */}
                    <div>
                        {reviews.length === 0 ? (
                            <p style={{ color: "var(--text-muted)", fontStyle: "italic", padding: "1.5rem 0", fontSize: "0.92rem" }}>
                                No reviews yet. Be the first to share your mindful experience with this product!
                            </p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {reviews.map(r => (
                                    <div key={r.id} style={{
                                        background: "var(--bg-surface-alt)",
                                        border: "1px solid var(--border-light)",
                                        borderRadius: "var(--radius-md)",
                                        padding: "1rem 1.25rem"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.35rem" }}>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.user_name}</div>
                                                <div style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                                                    Verified Buyer • {new Date(r.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>
                                            <div className="star-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={13}
                                                        fill={i < r.rating ? "#F59E0B" : "none"}
                                                        color={i < r.rating ? "#F59E0B" : "#D1D5DB"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p style={{ fontSize: "0.88rem", color: "var(--text-main)", lineHeight: 1.55 }}>
                                            "{r.comment}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Write Review Form */}
                    <div style={{
                        background: "var(--bg-page)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "clamp(1.25rem, 2.5vw, 1.75rem)"
                    }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                            Leave Your Review
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                            Help other conscious shoppers understand the quality, durability, and craftsmanship.
                        </p>

                        {user ? (
                            <form action={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div className="form-group">
                                    <label className="input-label">Your Rating</label>
                                    <select name="rating" defaultValue="5" className="input-field" style={{ width: "100%" }}>
                                        <option value="5">★★★★★ (5 Stars - Exceptional Quality)</option>
                                        <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                                        <option value="3">★★★☆☆ (3 Stars - Average)</option>
                                        <option value="2">★★☆☆☆ (2 Stars - Needs Improvement)</option>
                                        <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="input-label">Your Review</label>
                                    <textarea
                                        name="comment"
                                        required
                                        rows={4}
                                        placeholder="Describe the materials, feel, packaging, and how it holds up..."
                                        className="input-field"
                                    />
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                                    Submit Verified Review
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: "center", padding: "1.5rem" }}>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "0.85rem" }}>
                                    Please log in to submit a review for this product.
                                </p>
                                <Link href={`/login?redirect=/products/${product.id}`} className="btn-secondary btn-sm">
                                    Log In to Review
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
