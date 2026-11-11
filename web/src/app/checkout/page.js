import { getCart, createOrderFromCart } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, TreePine, Package, CreditCard, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login?redirect=/checkout");
    }

    const cartItems = getCart(user.email);
    if (cartItems.length === 0) {
        redirect("/cart");
    }

    let subtotal = 0;
    let totalCarbonSaved = 0;
    for (const item of cartItems) {
        subtotal += item.price * (item.quantity || 1);
        totalCarbonSaved += (item.carbon_saved_kg || 1.8) * (item.quantity || 1);
    }

    const shippingCost = subtotal >= 40 ? 0 : 4.50;
    const totalAmount = subtotal + shippingCost;

    async function handlePlaceOrder(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) redirect("/login");

        const shippingName = formData.get("shipping_name") || currentUser.full_name;
        const shippingAddress = formData.get("shipping_address") || "123 Sustainable Ave";
        const shippingCity = formData.get("shipping_city") || "Portland";
        const shippingZip = formData.get("shipping_zip") || "97201";
        const paymentMethod = formData.get("payment_method") || "EcoCard";

        let order;
        try {
            order = createOrderFromCart({
                userEmail: currentUser.email,
                shippingName,
                shippingAddress,
                shippingCity,
                shippingZip,
                paymentMethod
            });
        } catch (err) {
            console.error("Checkout failed:", err);
            redirect("/cart");
        }

        redirect(`/checkout/success?order_id=${order.id}`);
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                <div className="section-label">
                    <Lock size={13} />
                    <span>Encrypted & Carbon-Neutral Checkout</span>
                </div>
                <h1 className="page-title">Finalize Your Mindful Order</h1>
                <p className="page-subtitle">
                    Fast, secure, and packaged using zero-plastic plant-based materials.
                </p>
            </div>

            <form action={handlePlaceOrder} style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
                alignItems: "flex-start"
            }}>
                {/* Left: Shipping & Payment Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Shipping Address Card */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-xl)",
                        padding: "clamp(1.25rem, 3vw, 1.75rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.15rem, 2vw, 1.35rem)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                            <Package size={19} color="var(--brand-primary)" />
                            1. Shipping Destination
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div className="form-group">
                                <label className="input-label">Full Recipient Name</label>
                                <input
                                    name="shipping_name"
                                    type="text"
                                    required
                                    defaultValue={user.full_name}
                                    placeholder="Jordan Lee"
                                    className="input-field"
                                />
                            </div>

                            <div className="form-group">
                                <label className="input-label">Street Address & Apartment</label>
                                <input
                                    name="shipping_address"
                                    type="text"
                                    required
                                    defaultValue="742 Evergreen Terrace, Apt 4B"
                                    placeholder="123 Eco Way, Suite 200"
                                    className="input-field"
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.85rem" }}>
                                <div className="form-group">
                                    <label className="input-label">City</label>
                                    <input
                                        name="shipping_city"
                                        type="text"
                                        required
                                        defaultValue="Portland"
                                        placeholder="Portland"
                                        className="input-field"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">ZIP / Postal</label>
                                    <input
                                        name="shipping_zip"
                                        type="text"
                                        required
                                        defaultValue="97201"
                                        placeholder="97201"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Packaging Preference */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-xl)",
                        padding: "clamp(1.25rem, 3vw, 1.75rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.15rem, 2vw, 1.35rem)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                            <TreePine size={19} color="var(--brand-accent)" />
                            2. Packaging & Planet Impact
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <label style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "0.85rem 1rem",
                                border: "1px solid var(--brand-accent)",
                                background: "var(--brand-accent-light)",
                                borderRadius: "var(--radius-md)",
                                cursor: "pointer"
                            }}>
                                <input type="radio" name="packaging" defaultChecked style={{ marginTop: "0.2rem" }} />
                                <div>
                                    <strong style={{ fontSize: "0.9rem", color: "var(--brand-primary)" }}>Zero-Plastic Compostable Mailer (Recommended)</strong>
                                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                                        Made from 100% plant cornstarch and kraft paper sealed with water-activated starch tape.
                                    </p>
                                </div>
                            </label>

                            <label style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "0.85rem 1rem",
                                border: "1px solid var(--border-light)",
                                background: "var(--bg-surface-alt)",
                                borderRadius: "var(--radius-md)",
                                cursor: "pointer"
                            }}>
                                <input type="radio" name="packaging" style={{ marginTop: "0.2rem" }} />
                                <div>
                                    <strong style={{ fontSize: "0.9rem" }}>Minimalist Recycled Cardboard Box</strong>
                                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                                        Folded FSC-certified post-consumer fiber with unbleached crinkle paper padding.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Payment Simulator */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-xl)",
                        padding: "clamp(1.25rem, 3vw, 1.75rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.15rem, 2vw, 1.35rem)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                            <CreditCard size={19} color="var(--brand-warm)" />
                            3. Payment Method (Demo Simulator)
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            <div style={{
                                display: "flex",
                                gap: "0.75rem",
                                padding: "0.6rem 0.75rem",
                                background: "var(--bg-surface-alt)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-light)",
                                flexWrap: "wrap"
                            }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                                    <input type="radio" name="payment_method" value="Card" defaultChecked />
                                    <span>Credit / Debit Card</span>
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", marginLeft: "auto" }}>
                                    <input type="radio" name="payment_method" value="EcoPay Carbon Balance" />
                                    <span>EcoPay Offset</span>
                                </label>
                            </div>

                            <input
                                type="text"
                                defaultValue="4242 •••• •••• 4242"
                                className="input-field"
                                readOnly
                                style={{ background: "var(--bg-surface-alt)", color: "var(--text-muted)" }}
                            />
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                <input
                                    type="text"
                                    defaultValue="MM/YY: 12/28"
                                    className="input-field"
                                    readOnly
                                    style={{ background: "var(--bg-surface-alt)", color: "var(--text-muted)" }}
                                />
                                <input
                                    type="text"
                                    defaultValue="CVV: 888"
                                    className="input-field"
                                    readOnly
                                    style={{ background: "var(--bg-surface-alt)", color: "var(--text-muted)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary & Confirm Action */}
                <div style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-xl)",
                    padding: "clamp(1.25rem, 3vw, 1.75rem)",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                        Order Summary ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxHeight: "240px", overflowY: "auto", paddingRight: "0.35rem", marginBottom: "1.25rem" }}>
                        {cartItems.map(item => (
                            <div key={item.cart_id} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: "1px solid var(--border-light)", flexShrink: 0 }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.title}
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>
                                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "0.92rem", flexShrink: 0 }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", borderTop: "1px solid var(--border-light)", paddingTop: "1rem", marginBottom: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-muted)" }}>Subtotal:</span>
                            <strong>${subtotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-muted)" }}>Carbon-Neutral Delivery:</span>
                            <span>{shippingCost === 0 ? <strong style={{ color: "var(--brand-accent)" }}>FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-muted)" }}>Eden Native Tree Planting:</span>
                            <strong style={{ color: "var(--brand-accent)" }}>Included</strong>
                        </div>

                        <div style={{
                            paddingTop: "0.75rem",
                            borderTop: "2px solid var(--border-light)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline"
                        }}>
                            <span style={{ fontSize: "1.05rem", fontWeight: 700 }}>Total Due:</span>
                            <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
                    >
                        Confirm & Place Order <ArrowRight size={17} />
                    </button>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.85rem", fontSize: "0.75rem", color: "var(--text-subtle)" }}>
                        <ShieldCheck size={15} color="var(--brand-accent)" style={{ flexShrink: 0 }} />
                        <span>Secured with 256-bit SSL & Zero-Waste Verification</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
