import { getAuthUser } from "@/lib/auth";
import { getUserOrders, getUserStats, updateUserProfile } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, TreePine, Package, Leaf, Award, LogOut, PlusCircle, Clock, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login?redirect=/profile");
    }

    const orders = getUserOrders(user.email);
    const stats = getUserStats(user.email);

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Profile Header & Impact Banner */}
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.25rem, 3vw, 2.25rem)",
                boxShadow: "var(--shadow-sm)",
                marginBottom: "clamp(1.5rem, 3vh, 2.5rem)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                    marginBottom: "1.75rem"
                }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                        <img
                            src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name)}`}
                            alt={user.full_name}
                            style={{
                                width: "clamp(64px, 10vw, 84px)",
                                height: "clamp(64px, 10vw, 84px)",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "3px solid var(--brand-accent-light)",
                                boxShadow: "var(--shadow-md)",
                                flexShrink: 0
                            }}
                        />
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 700, margin: 0 }}>
                                    {user.full_name}
                                </h1>
                                <span className="badge-pill badge-green" style={{ textTransform: "capitalize", fontSize: "0.72rem" }}>
                                    {user.role === "seller" ? "Verified Artisan" : "Conscious Consumer"}
                                </span>
                            </div>
                            <div style={{ fontSize: "0.82rem", color: "var(--text-subtle)", margin: "0.2rem 0 0.4rem" }}>
                                {user.email}
                            </div>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: "520px", lineHeight: 1.45 }}>
                                {user.bio || "Passionate about low-waste living and supporting independent craftspeople."}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", width: "100%", maxWidth: "260px" }}>
                        <Link href="/add-product" className="btn-primary btn-sm" style={{ flex: 1 }}>
                            <PlusCircle size={14} /> Sell Product
                        </Link>
                        <a href="/api/auth/logout" className="btn-secondary btn-sm" style={{ color: "#EF4444", borderColor: "#FCA5A5" }}>
                            <LogOut size={14} /> Sign Out
                        </a>
                    </div>
                </div>

                {/* Personal Impact Dashboard (2x2 on mobile, 4x1 on desktop) */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
                    gap: "clamp(0.75rem, 1.8vw, 1.25rem)",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid var(--border-light)"
                }}>
                    <div style={{ background: "var(--bg-surface-alt)", padding: "1rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--brand-primary)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                            <Leaf size={14} /> Carbon Saved
                        </div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--brand-primary)", marginTop: "0.25rem" }}>
                            {stats.totalCarbonSaved} kg
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                            CO₂ avoided
                        </div>
                    </div>

                    <div style={{ background: "var(--bg-surface-alt)", padding: "1rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--brand-accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                            <TreePine size={14} /> Trees Planted
                        </div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--brand-accent)", marginTop: "0.25rem" }}>
                            {stats.treesPlanted}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                            Via Eden Projects
                        </div>
                    </div>

                    <div style={{ background: "var(--bg-surface-alt)", padding: "1rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--brand-warm)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                            <Package size={14} /> Total Orders
                        </div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--brand-warm)", marginTop: "0.25rem" }}>
                            {stats.totalOrders}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                            ${stats.totalSpent.toFixed(2)} spent
                        </div>
                    </div>

                    <div style={{ background: "var(--bg-surface-alt)", padding: "1rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--brand-gold)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                            <Award size={14} /> Listings
                        </div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--brand-gold)", marginTop: "0.25rem" }}>
                            {stats.activeListings}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                            <Link href="/my-listings" style={{ textDecoration: "underline", color: "inherit" }}>Studio</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History Section */}
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.25rem, 3vw, 2.25rem)",
                boxShadow: "var(--shadow-sm)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                        <div className="section-label">
                            <Clock size={13} />
                            <span>Lifetime Transactions</span>
                        </div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)", margin: 0 }}>
                            Order History ({orders.length})
                        </h2>
                    </div>
                    <Link href="/products" className="btn-secondary btn-sm">
                        Continue Shopping
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                        <Package size={36} style={{ color: "var(--text-subtle)", margin: "0 auto 0.75rem" }} />
                        <h4 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>No orders placed yet</h4>
                        <p style={{ fontSize: "0.85rem", marginBottom: "1.25rem" }}>Explore our marketplace for certified zero-waste lifestyle staples.</p>
                        <Link href="/products" className="btn-primary btn-sm">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {orders.map(order => (
                            <div key={order.id} style={{
                                background: "var(--bg-surface-alt)",
                                border: "1px solid var(--border-light)",
                                borderRadius: "var(--radius-lg)",
                                padding: "clamp(1rem, 2vw, 1.35rem)"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    paddingBottom: "0.75rem",
                                    borderBottom: "1px solid var(--border-light)",
                                    marginBottom: "0.75rem",
                                    flexWrap: "wrap",
                                    gap: "0.5rem"
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", color: "var(--text-main)" }}>
                                            Order #{order.order_number}
                                        </div>
                                        <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)", marginTop: "0.15rem" }}>
                                            Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <span className="badge-pill badge-green" style={{ fontSize: "0.75rem" }}>
                                            <CheckCircle size={12} /> {order.status}
                                        </span>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                                            ${Number(order.total_amount).toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.85rem" }}>
                                    {order.items?.map(it => (
                                        <div key={it.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
                                                {it.image_url && (
                                                    <img
                                                        src={it.image_url}
                                                        alt={it.title}
                                                        style={{ width: "38px", height: "38px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                                                    />
                                                )}
                                                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{it.title}</span>
                                                    <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginLeft: "0.35rem" }}>
                                                        × {it.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: "0.88rem", flexShrink: 0 }}>
                                                ${(Number(it.price) * it.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "0.78rem",
                                    color: "var(--text-muted)",
                                    paddingTop: "0.65rem",
                                    borderTop: "1px dashed var(--border-subtle)",
                                    flexWrap: "wrap",
                                    gap: "0.35rem"
                                }}>
                                    <div>
                                        Tracking: <strong>{order.tracking_code}</strong> • Shipped to: {order.shipping_city}
                                    </div>
                                    <div style={{ color: "var(--brand-accent)", fontWeight: 600 }}>
                                        🌱 -{order.carbon_offset_kg || 2.8}kg CO₂ Offset
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
