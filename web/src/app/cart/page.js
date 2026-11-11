import { getCart, updateCartQuantity, removeFromCart, clearCart } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, TreePine, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CartPage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login?redirect=/cart");
    }

    const cartItems = getCart(user.email);

    let subtotal = 0;
    let totalCarbonSaved = 0;
    for (const item of cartItems) {
        subtotal += item.price * (item.quantity || 1);
        totalCarbonSaved += (item.carbon_saved_kg || 1.8) * (item.quantity || 1);
    }

    const freeShippingThreshold = 40;
    const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.50;
    const grandTotal = subtotal + shippingCost;

    async function handleUpdateQty(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) return;
        const cartId = Number(formData.get("cart_id"));
        const newQty = Number(formData.get("new_qty"));
        updateCartQuantity(cartId, currentUser.email, newQty);
        redirect("/cart");
    }

    async function handleRemove(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) return;
        const cartId = Number(formData.get("cart_id"));
        removeFromCart(cartId, currentUser.email);
        redirect("/cart");
    }

    async function handleClear() {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) return;
        clearCart(currentUser.email);
        redirect("/cart");
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                <div className="section-label">
                    <Sparkles size={13} />
                    <span>Mindful Basket</span>
                </div>
                <h1 className="page-title">Your Shopping Cart</h1>
                <p className="page-subtitle">
                    Review your curated sustainable picks before choosing carbon-neutral packaging.
                </p>
            </div>

            {cartItems.length === 0 ? (
                <div style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-xl)",
                    padding: "clamp(3rem, 6vh, 5rem) 1.5rem",
                    textAlign: "center",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    <div style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "var(--brand-accent-light)",
                        color: "var(--brand-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.25rem"
                    }}>
                        <ShoppingBag size={32} />
                    </div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", marginBottom: "0.5rem" }}>
                        Your eco-basket is currently empty
                    </h2>
                    <p style={{ color: "var(--text-muted)", maxWidth: "440px", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
                        Discover handcrafted kitchen goods, botanical skincare, and upcycled treasures from verified independent artisans.
                    </p>
                    <Link href="/products" className="btn-primary" style={{ padding: "0.8rem 1.8rem" }}>
                        Explore Sustainable Finds <ArrowRight size={17} />
                    </Link>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                    gap: "clamp(1.5rem, 3vw, 2.5rem)",
                    alignItems: "flex-start"
                }}>
                    {/* Cart Items List */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-xl)",
                        padding: "clamp(1rem, 2.5vw, 1.75rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", marginBottom: "1.25rem" }}>
                            <span style={{ fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}>
                                Items in Cart ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})
                            </span>
                            <form action={handleClear}>
                                <button type="submit" style={{ fontSize: "0.8rem", color: "var(--text-subtle)", textDecoration: "underline", cursor: "pointer" }}>
                                    Clear Cart
                                </button>
                            </form>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {cartItems.map(item => (
                                <div key={item.cart_id} style={{
                                    display: "flex",
                                    gap: "1rem",
                                    paddingBottom: "1.25rem",
                                    borderBottom: "1px solid var(--border-light)",
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                }}>
                                    <Link href={`/products/${item.product_id}`} style={{ flexShrink: 0 }}>
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            style={{
                                                width: "78px",
                                                height: "78px",
                                                objectFit: "cover",
                                                borderRadius: "var(--radius-md)",
                                                border: "1px solid var(--border-light)"
                                            }}
                                        />
                                    </Link>

                                    <div style={{ flex: "1 1 180px", minWidth: "160px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                                            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--brand-warm)" }}>
                                                {item.category}
                                            </span>
                                            <span className="badge-pill badge-green" style={{ fontSize: "0.65rem" }}>
                                                {item.eco_badge}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", fontWeight: 700, marginBottom: "0.25rem", lineHeight: 1.3 }}>
                                            <Link href={`/products/${item.product_id}`} style={{ color: "var(--text-main)" }}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                                            ${Number(item.price).toFixed(2)} each
                                        </div>
                                    </div>

                                    {/* Stepper & Line price on right / wrapped */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto", flexWrap: "wrap" }}>
                                        {/* Stepper */}
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                            <form action={handleUpdateQty}>
                                                <input type="hidden" name="cart_id" value={item.cart_id} />
                                                <input type="hidden" name="new_qty" value={item.quantity - 1} />
                                                <button
                                                    type="submit"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        borderRadius: "var(--radius-sm)",
                                                        border: "1px solid var(--border-subtle)",
                                                        background: "var(--bg-surface-alt)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    title="Decrease quantity"
                                                >
                                                    <Minus size={13} />
                                                </button>
                                            </form>

                                            <span style={{ fontWeight: 700, minWidth: "22px", textAlign: "center", fontSize: "0.92rem" }}>
                                                {item.quantity}
                                            </span>

                                            <form action={handleUpdateQty}>
                                                <input type="hidden" name="cart_id" value={item.cart_id} />
                                                <input type="hidden" name="new_qty" value={item.quantity + 1} />
                                                <button
                                                    type="submit"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        borderRadius: "var(--radius-sm)",
                                                        border: "1px solid var(--border-subtle)",
                                                        background: "var(--bg-surface-alt)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    title="Increase quantity"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </form>
                                        </div>

                                        {/* Line total & remove */}
                                        <div style={{ textAlign: "right", minWidth: "70px" }}>
                                            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                            <form action={handleRemove} style={{ marginTop: "0.2rem" }}>
                                                <input type="hidden" name="cart_id" value={item.cart_id} />
                                                <button
                                                    type="submit"
                                                    style={{ color: "#EF4444", fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.2rem", cursor: "pointer" }}
                                                >
                                                    <Trash2 size={12} /> Remove
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Free shipping banner */}
                        <div style={{
                            marginTop: "1.5rem",
                            background: "var(--bg-surface-alt)",
                            padding: "0.85rem 1rem",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.82rem"
                        }}>
                            {subtotal >= freeShippingThreshold ? (
                                <span style={{ color: "var(--brand-accent)", fontWeight: 600 }}>
                                    🎉 You've unlocked FREE Carbon-Neutral Shipping!
                                </span>
                            ) : (
                                <span>
                                    Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to unlock <strong>FREE shipping</strong>!
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-xl)",
                        padding: "clamp(1.25rem, 3vw, 2rem)",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", marginBottom: "1.25rem" }}>
                            Order Summary
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.92rem", marginBottom: "1.25rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-muted)" }}>Items Subtotal:</span>
                                <strong>${subtotal.toFixed(2)}</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-muted)" }}>Carbon-Neutral Delivery:</span>
                                <span>{shippingCost === 0 ? <strong style={{ color: "var(--brand-accent)" }}>FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-muted)" }}>Estimated Tree Planting:</span>
                                <span style={{ color: "var(--brand-accent)", fontWeight: 600 }}>1 Native Tree (Included)</span>
                            </div>

                            <div style={{
                                paddingTop: "0.85rem",
                                marginTop: "0.35rem",
                                borderTop: "2px solid var(--border-light)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline"
                            }}>
                                <span style={{ fontSize: "1.05rem", fontWeight: 700 }}>Grand Total:</span>
                                <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                                    ${grandTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Impact badge */}
                        <div style={{
                            background: "var(--badge-green-bg)",
                            color: "var(--badge-green-text)",
                            padding: "0.75rem 1rem",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "1.25rem"
                        }}>
                            <TreePine size={16} style={{ flexShrink: 0 }} />
                            <span>This order prevents ~{totalCarbonSaved.toFixed(1)}kg of CO₂ emissions.</span>
                        </div>

                        <Link
                            href="/checkout"
                            className="btn-primary"
                            style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
                        >
                            Proceed to Checkout <ArrowRight size={17} />
                        </Link>

                        <div style={{ textAlign: "center", marginTop: "0.85rem" }}>
                            <Link href="/products" style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "underline" }}>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
