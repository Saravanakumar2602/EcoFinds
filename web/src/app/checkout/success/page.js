import { getOrderById } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, TreePine, Package, ArrowRight, ShieldCheck, Download, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({ searchParams }) {
    const params = await searchParams;
    const orderId = Number(params?.order_id);
    const user = await getAuthUser();

    if (!user || !orderId) {
        redirect("/products");
    }

    const order = getOrderById(orderId, user.email);
    if (!order) {
        redirect("/profile");
    }

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            {/* Success Hero Banner */}
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "3.5rem 2.5rem",
                textAlign: "center",
                boxShadow: "var(--shadow-md)",
                marginBottom: "2.5rem"
            }}>
                <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--brand-accent-light)",
                    color: "var(--brand-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem"
                }}>
                    <CheckCircle2 size={46} strokeWidth={2.4} />
                </div>

                <div className="section-label" style={{ marginBottom: "0.5rem" }}>
                    <Sparkles size={14} />
                    <span>Order Confirmed & Eco-Pledged</span>
                </div>

                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Thank you for shopping mindfully, {order.shipping_name.split(' ')[0]}!
                </h1>

                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
                    Your order <strong>#{order.order_number}</strong> has been received by our artisan collective. We are assembling your package using 100% plastic-free materials.
                </p>

                {/* Carbon Offset & Tree Planted Banner */}
                <div style={{
                    background: "var(--badge-green-bg)",
                    border: "1px solid #BBF7D0",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    color: "var(--badge-green-text)",
                    maxWidth: "600px",
                    margin: "0 auto 2rem"
                }}>
                    <TreePine size={28} />
                    <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                            Environmental Impact of This Purchase
                        </div>
                        <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                            Offset <strong>{order.carbon_offset_kg || 3.5} kg CO₂</strong> emissions & funded <strong>1 native tree</strong> planting via Eden Reforestation Projects.
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <Link href="/profile" className="btn-primary">
                        View in Profile & Order Tracking
                    </Link>
                    <Link href="/products" className="btn-secondary">
                        Browse More Sustainable Goods
                    </Link>
                </div>
            </div>

            {/* Receipt Summary Card */}
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "var(--shadow-sm)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
                    <div>
                        <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.05em" }}>
                            Receipt Details
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                            Order #{order.order_number}
                        </h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <span className="badge-pill badge-green" style={{ fontSize: "0.8rem" }}>
                            {order.status}
                        </span>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)", marginTop: "0.25rem" }}>
                            Tracking: <strong>{order.tracking_code}</strong>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                    {order.items?.map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                {item.image_url && (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-light)" }}
                                    />
                                )}
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.title}</div>
                                    <div style={{ fontSize: "0.82rem", color: "var(--text-subtle)" }}>Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</div>
                                </div>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                                ${(Number(item.price) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shipping & Payment Meta */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                    padding: "1.25rem",
                    background: "var(--bg-surface-alt)",
                    borderRadius: "var(--radius-lg)",
                    fontSize: "0.88rem"
                }}>
                    <div>
                        <strong style={{ display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Delivery Address:</strong>
                        <div style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
                            {order.shipping_name}<br />
                            {order.shipping_address}<br />
                            {order.shipping_city}, {order.shipping_zip}
                        </div>
                    </div>
                    <div>
                        <strong style={{ display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Packaging & Payment:</strong>
                        <div style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
                            100% Compostable Mailer<br />
                            Payment Method: {order.payment_method}<br />
                            Total Paid: <strong style={{ color: "var(--brand-primary)" }}>${Number(order.total_amount).toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
