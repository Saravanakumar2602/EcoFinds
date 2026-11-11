import Link from "next/link";
import { getProducts } from "@/lib/db";
import { Search, ShoppingCart, Star, Sparkles, X, ArrowUpDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
    const params = await searchParams;
    const currentCategory = params?.category || "All";
    const currentBadge = params?.eco_badge || "All";
    const currentSearch = params?.search || "";
    const currentSort = params?.sort || "newest";

    const products = getProducts({
        category: currentCategory,
        eco_badge: currentBadge,
        search: currentSearch,
        sort: currentSort,
        limit: 100
    });

    const categories = [
        "All",
        "Kitchen & Dining",
        "Personal Care",
        "Home & Living",
        "Fashion & Bags",
        "Food & Pantry"
    ];

    const badges = [
        "All",
        "Zero Waste",
        "Certified Organic",
        "Upcycled",
        "Plastic-Free",
        "Non-Toxic",
        "Fair Trade"
    ];

    function makeFilterUrl({ category, eco_badge, sort, search, clear }) {
        if (clear) return "/products";
        const q = new URLSearchParams();
        const cat = category !== undefined ? category : currentCategory;
        const bdg = eco_badge !== undefined ? eco_badge : currentBadge;
        const srt = sort !== undefined ? sort : currentSort;
        const srch = search !== undefined ? search : currentSearch;

        if (cat && cat !== "All") q.set("category", cat);
        if (bdg && bdg !== "All") q.set("eco_badge", bdg);
        if (srt && srt !== "newest") q.set("sort", srt);
        if (srch && srch.trim() !== "") q.set("search", srch.trim());

        const str = q.toString();
        return str ? `/products?${str}` : "/products";
    }

    const hasActiveFilters = currentCategory !== "All" || currentBadge !== "All" || currentSearch !== "" || currentSort !== "newest";

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                <div className="section-label">
                    <Sparkles size={13} />
                    <span>Verified Sustainable Catalog</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <h1 className="page-title" style={{ margin: "0 0 0.35rem" }}>The Marketplace</h1>
                        <p className="page-subtitle">
                            Every item is verified for plastic-free packaging, closed-loop materials, and ethical labor standards.
                        </p>
                    </div>

                    {/* In-page search */}
                    <form action="/products" method="GET" style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
                        {currentCategory !== "All" && <input type="hidden" name="category" value={currentCategory} />}
                        {currentBadge !== "All" && <input type="hidden" name="eco_badge" value={currentBadge} />}
                        {currentSort !== "newest" && <input type="hidden" name="sort" value={currentSort} />}
                        <Search size={17} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)" }} />
                        <input
                            type="text"
                            name="search"
                            defaultValue={currentSearch}
                            placeholder="Search materials, crafts, titles..."
                            className="input-field"
                            style={{ paddingLeft: "2.5rem" }}
                        />
                    </form>
                </div>
            </div>

            {/* Filter Control Bar */}
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)",
                marginBottom: "clamp(1.75rem, 3.5vh, 2.5rem)",
                boxShadow: "var(--shadow-sm)"
            }}>
                {/* Categories Pills (Touch scrollable) */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    paddingBottom: "0.75rem",
                    marginBottom: "1rem",
                    borderBottom: "1px solid var(--border-light)",
                    scrollbarWidth: "none"
                }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.35rem", whiteSpace: "nowrap" }}>
                        Category:
                    </span>
                    {categories.map(c => {
                        const active = (c === "All" && currentCategory === "All") || c === currentCategory;
                        return (
                            <Link
                                key={c}
                                href={makeFilterUrl({ category: c })}
                                style={{
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    padding: "0.35rem 0.8rem",
                                    borderRadius: "var(--radius-full)",
                                    whiteSpace: "nowrap",
                                    background: active ? "var(--brand-primary)" : "var(--bg-surface-alt)",
                                    color: active ? "#fff" : "var(--text-main)",
                                    transition: "all 0.15s ease",
                                    border: active ? "1px solid var(--brand-primary)" : "1px solid transparent",
                                    flexShrink: 0
                                }}
                            >
                                {c}
                            </Link>
                        );
                    })}
                </div>

                {/* Sub-Filters: Eco-Badge & Sort */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.2rem" }}>
                            Eco Impact:
                        </span>
                        {badges.map(b => {
                            const active = (b === "All" && currentBadge === "All") || b === currentBadge;
                            return (
                                <Link
                                    key={b}
                                    href={makeFilterUrl({ eco_badge: b })}
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        padding: "0.22rem 0.55rem",
                                        borderRadius: "var(--radius-full)",
                                        background: active ? "var(--badge-green-bg)" : "transparent",
                                        color: active ? "var(--badge-green-text)" : "var(--text-muted)",
                                        border: active ? "1px solid var(--brand-accent)" : "1px solid var(--border-subtle)",
                                        transition: "all 0.15s ease",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {b}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Sort Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem", whiteSpace: "nowrap" }}>
                            <ArrowUpDown size={14} /> Sort:
                        </span>
                        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                            {[
                                { key: "newest", label: "Newest" },
                                { key: "price_asc", label: "Price: Low" },
                                { key: "price_desc", label: "Price: High" },
                                { key: "rating", label: "Top Rated" },
                                { key: "impact", label: "Most CO₂ Saved" }
                            ].map(s => (
                                <Link
                                    key={s.key}
                                    href={makeFilterUrl({ sort: s.key })}
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        padding: "0.28rem 0.55rem",
                                        borderRadius: "var(--radius-sm)",
                                        background: currentSort === s.key ? "var(--brand-primary)" : "var(--bg-surface-alt)",
                                        color: currentSort === s.key ? "#fff" : "var(--text-main)",
                                        border: "1px solid var(--border-subtle)",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active filter summary */}
                {hasActiveFilters && (
                    <div style={{
                        marginTop: "0.85rem",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid var(--border-light)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        flexWrap: "wrap",
                        gap: "0.5rem"
                    }}>
                        <div>
                            Found <strong>{products.length}</strong> {products.length === 1 ? "item" : "items"}
                            {currentCategory !== "All" && <span> in <strong>{currentCategory}</strong></span>}
                            {currentBadge !== "All" && <span> tagged <strong>{currentBadge}</strong></span>}
                            {currentSearch && <span> for "<strong>{currentSearch}</strong>"</span>}
                        </div>
                        <Link href="/products" style={{ color: "var(--brand-warm)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <X size={14} /> Clear all filters
                        </Link>
                    </div>
                )}
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
                <div style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-xl)",
                    padding: "4rem 1.5rem",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌿</div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", marginBottom: "0.5rem" }}>No matching artisan items found</h3>
                    <p style={{ color: "var(--text-muted)", maxWidth: "440px", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
                        Try adjusting your keywords, selecting "All Categories", or clearing your filters.
                    </p>
                    <Link href="/products" className="btn-primary">
                        Browse Full Catalog
                    </Link>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map(p => (
                        <div key={p.id} className="product-card">
                            <div className="product-img-wrapper">
                                <Link href={`/products/${p.id}`}>
                                    <img src={p.image_url} alt={p.title} className="product-img" />
                                </Link>
                                <div className="product-badge-overlay">
                                    <span className="badge-pill badge-green">{p.eco_badge}</span>
                                    {p.carbon_saved_kg && (
                                        <span className="badge-carbon">🌱 -{p.carbon_saved_kg}kg CO₂</span>
                                    )}
                                </div>
                            </div>

                            <div className="product-content">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                                    <span className="product-cat">{p.category}</span>
                                    {p.rating && (
                                        <div className="star-rating">
                                            <Star size={12} fill="#F59E0B" color="#F59E0B" />
                                            <span>{p.rating} ({p.reviews_count || 0})</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="product-name">
                                    <Link href={`/products/${p.id}`}>{p.title}</Link>
                                </h3>

                                <p className="product-excerpt">{p.description}</p>

                                <div className="product-meta">
                                    <div className="price-box">
                                        <span className="price-current">${Number(p.price).toFixed(2)}</span>
                                        {p.original_price && (
                                            <span className="price-original">${Number(p.original_price).toFixed(2)}</span>
                                        )}
                                    </div>

                                    <div style={{ display: "flex", gap: "0.4rem" }}>
                                        <Link href={`/products/${p.id}`} className="btn-secondary btn-sm" title="View details">
                                            Details
                                        </Link>
                                        <Link href={`/cart/add?id=${p.id}`} className="btn-primary btn-sm" title="Add 1 to Cart">
                                            <ShoppingCart size={14} /> Add
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
