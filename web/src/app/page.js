import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, TreePine, Sparkles, PackageCheck, Award, HeartHandshake } from "lucide-react";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
    const featuredProducts = getProducts({ limit: 4 });

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: "clamp(1rem, 3vh, 2.5rem) 0 clamp(2rem, 4vh, 3.5rem)",
                position: "relative"
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    gap: "clamp(1.75rem, 3.5vw, 3rem)",
                    alignItems: "center"
                }}>
                    {/* Left Column: Heading, Pitch, Actions, Trust Badges */}
                    <div>
                        <div className="section-label">
                            <Sparkles size={13} />
                            <span>Conscious Living, Refined</span>
                        </div>

                        <h1 style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3.6vw, 2.9rem)",
                            fontWeight: 700,
                            lineHeight: 1.18,
                            letterSpacing: "-0.025em",
                            color: "var(--text-main)",
                            margin: "0 0 1rem"
                        }}>
                            Thoughtfully made goods for a lighter footprint.
                        </h1>

                        <p style={{
                            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                            lineHeight: 1.6,
                            color: "var(--text-muted)",
                            marginBottom: "1.75rem",
                            maxWidth: "520px"
                        }}>
                            Shop handcrafted home essentials, zero-waste kitchenware, and pure botanical apothecary—direct from verified independent artisans dedicated to a circular earth.
                        </p>

                        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
                            <Link href="/products" className="btn-primary">
                                Explore Marketplace <ArrowRight size={17} />
                            </Link>
                            <Link href="/add-product" className="btn-secondary">
                                Sell Your Crafts
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div style={{
                            display: "flex",
                            gap: "clamp(1rem, 2vw, 1.75rem)",
                            marginTop: "2rem",
                            paddingTop: "1.25rem",
                            borderTop: "1px solid var(--border-light)",
                            flexWrap: "wrap",
                            alignItems: "center"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                                <PackageCheck size={17} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                                <span>100% Plastic-Free Mailers</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                                <TreePine size={17} color="var(--brand-accent)" style={{ flexShrink: 0 }} />
                                <span>1 Tree Planted per Order</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                                <ShieldCheck size={17} color="var(--brand-warm)" style={{ flexShrink: 0 }} />
                                <span>Vetted Artisan Goods</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual Showcase Card (Optimized Height for all screens) */}
                    <div>
                        <div style={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border-light)",
                            borderRadius: "var(--radius-xl)",
                            overflow: "hidden",
                            boxShadow: "var(--shadow-md)",
                            position: "relative",
                            maxWidth: "500px",
                            margin: "0 auto"
                        }}>
                            <div style={{ position: "relative", height: "clamp(190px, 27vh, 260px)", width: "100%", overflow: "hidden" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                                    alt="Upcycled Sailcloth Market Tote"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <div style={{
                                    position: "absolute",
                                    top: "0.85rem",
                                    left: "0.85rem",
                                    background: "rgba(255, 255, 255, 0.95)",
                                    backdropFilter: "blur(8px)",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "var(--radius-full)",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    color: "var(--brand-primary)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.3rem"
                                }}>
                                    <span>🌿 Artisan Spotlight</span>
                                </div>

                                <div style={{
                                    position: "absolute",
                                    bottom: "0.85rem",
                                    right: "0.85rem",
                                    background: "rgba(30, 70, 52, 0.92)",
                                    backdropFilter: "blur(8px)",
                                    color: "#fff",
                                    padding: "0.3rem 0.75rem",
                                    borderRadius: "var(--radius-full)",
                                    fontSize: "0.76rem",
                                    fontWeight: 700
                                }}>
                                    -5.6 kg CO₂ Diverted
                                </div>
                            </div>

                            <div style={{ padding: "clamp(1rem, 2vw, 1.35rem)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--brand-warm)" }}>
                                            Upcycled Ocean Gear
                                        </div>
                                        <h3 style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)", fontWeight: 700, color: "var(--text-main)", margin: "0.15rem 0" }}>
                                            Upcycled Sailcloth Everyday Market Tote
                                        </h3>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "0.5rem" }}>
                                        <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-primary)" }}>$44.00</div>
                                        <div style={{ fontSize: "0.78rem", textDecoration: "line-through", color: "var(--text-subtle)" }}>$58.00</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
                                    Handcrafted by Elena Rostova from retired competitive racing sails and yachting cordage. Built for lifetime durability.
                                </p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <img
                                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                                            alt="Elena Rostova"
                                            style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                                        />
                                        <div>
                                            <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>Elena Rostova</div>
                                            <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)" }}>Pacific Coast Artisan</div>
                                        </div>
                                    </div>
                                    <Link href="/products/3" className="btn-primary btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Metric Strip */}
            <section style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)",
                margin: "0 0 clamp(3rem, 6vh, 5rem)",
                boxShadow: "var(--shadow-sm)"
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                    gap: "clamp(1.25rem, 2.5vw, 2rem)",
                    textAlign: "center"
                }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 700, color: "var(--brand-primary)" }}>
                            12,480 kg
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>
                            CO₂ Footprint Offset
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "0.15rem" }}>
                            Across verified shipments
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 700, color: "var(--brand-warm)" }}>
                            18,900+
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>
                            Single-Use Plastics Replaced
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "0.15rem" }}>
                            Via reusable lifestyle swaps
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 700, color: "var(--brand-accent)" }}>
                            3,140
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>
                            Native Trees Planted
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "0.15rem" }}>
                            Partnered with Eden Reforestation
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 700, color: "var(--brand-gold)" }}>
                            100%
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>
                            Circular Packaging
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginTop: "0.15rem" }}>
                            Cornstarch & water-activated tape
                        </div>
                    </div>
                </div>
            </section>

            {/* Mindful Categories Grid */}
            <section style={{ marginBottom: "clamp(3rem, 6vh, 5.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                        <div className="section-label">
                            <Leaf size={13} />
                            <span>Curated Departments</span>
                        </div>
                        <h2 className="page-title" style={{ margin: 0 }}>
                            Explore Sustainable Living
                        </h2>
                    </div>
                    <Link href="/products" style={{ fontWeight: 600, color: "var(--brand-primary)", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem" }}>
                        View All Categories <ArrowRight size={15} />
                    </Link>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                    gap: "clamp(0.85rem, 1.8vw, 1.25rem)"
                }}>
                    {[
                        { name: "Kitchen & Dining", label: "Zero-Waste Cookware & Utensils", img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80", count: "3 items" },
                        { name: "Personal Care", label: "Cold-Pressed & Solid Apothecary", img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80", count: "3 items" },
                        { name: "Home & Living", label: "Pure Beeswax & Recycled Glass", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80", count: "4 items" },
                        { name: "Fashion & Bags", label: "Upcycled Sailcloth & Linens", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80", count: "2 items" },
                        { name: "Food & Pantry", label: "Fair-Trade Shade Coffee", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", count: "1 item" },
                    ].map((cat, idx) => (
                        <Link
                            key={idx}
                            href={`/products?category=${encodeURIComponent(cat.name)}`}
                            style={{
                                position: "relative",
                                height: "clamp(180px, 24vh, 240px)",
                                borderRadius: "var(--radius-lg)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                padding: "1.25rem",
                                color: "#fff",
                                textDecoration: "none",
                                background: "linear-gradient(135deg, #1C3829 0%, #29503A 100%)",
                                boxShadow: "var(--shadow-sm)"
                            }}
                            className="category-tile"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                loading="lazy"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.68)"
                                }}
                            />
                            {/* Gradient protection overlay for text legibility */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(19, 39, 29, 0.9) 0%, rgba(19, 39, 29, 0.3) 60%, rgba(19, 39, 29, 0.05) 100%)",
                                pointerEvents: "none"
                            }} />
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#F0B5A1" }}>
                                    {cat.count}
                                </span>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.15rem 0", color: "#FFFFFF" }}>{cat.name}</h3>
                                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.35, margin: 0 }}>{cat.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trending Mindful Finds */}
            <section style={{ marginBottom: "clamp(3rem, 6vh, 5.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                        <div className="section-label">
                            <Award size={13} />
                            <span>Community Favorites</span>
                        </div>
                        <h2 className="page-title" style={{ margin: 0 }}>
                            Featured Artisan Pieces
                        </h2>
                    </div>
                    <Link href="/products" className="btn-secondary btn-sm">
                        View Marketplace ({featuredProducts.length}+ items)
                    </Link>
                </div>

                <div className="product-grid">
                    {featuredProducts.map(p => (
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
                                <div className="product-cat">{p.category}</div>
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
                                    <Link href={`/products/${p.id}`} className="btn-primary btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Artisan Spotlight Narrative */}
            <section style={{
                background: "var(--bg-surface-alt)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.75rem, 4vw, 3.25rem)",
                marginBottom: "clamp(2rem, 4vh, 4rem)"
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                    gap: "clamp(1.5rem, 3.5vw, 3rem)",
                    alignItems: "center"
                }}>
                    <div style={{ position: "relative" }}>
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                            alt="Artisan Elena Rostova in her workshop"
                            style={{
                                width: "100%",
                                height: "clamp(240px, 34vh, 360px)",
                                objectFit: "cover",
                                borderRadius: "var(--radius-lg)",
                                boxShadow: "var(--shadow-md)"
                            }}
                        />
                        <div style={{
                            position: "absolute",
                            bottom: "-0.75rem",
                            left: "1rem",
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border-light)",
                            borderRadius: "var(--radius-md)",
                            padding: "0.6rem 1rem",
                            boxShadow: "var(--shadow-md)"
                        }}>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Elena Rostova</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>Founder, Wildroot Botánica</div>
                        </div>
                    </div>

                    <div>
                        <div className="section-label">
                            <HeartHandshake size={13} />
                            <span>Behind the Craft</span>
                        </div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "1rem" }}>
                            "True sustainability is making things so durable you only ever need one."
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                            Elena sources discarded yacht sails, fallen cedar from storm cleanup, and wild-harvested botanicals to handcraft zero-waste daily staples. Every item on EcoFinds is verified for origin, fair-labor compensation, and end-of-life biodegradability.
                        </p>
                        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                            <Link href="/products?owner=artisan%40ecofinds.com" className="btn-primary">
                                Shop Elena's Collection
                            </Link>
                            <Link href="/add-product" className="btn-secondary">
                                Become a Maker
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
