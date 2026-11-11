import { getAuthUser } from "@/lib/auth";
import { createProduct } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login?redirect=/add-product");
    }

    async function handleAddProduct(formData) {
        "use server";
        const currentUser = await getAuthUser();
        if (!currentUser) redirect("/login");

        const title = formData.get("title");
        const category = formData.get("category");
        const price = formData.get("price");
        const originalPrice = formData.get("original_price");
        const imageUrl = formData.get("image_url");
        const ecoBadge = formData.get("eco_badge");
        const materials = formData.get("materials");
        const carbonSaved = formData.get("carbon_saved_kg");
        const stock = formData.get("stock");
        const condition = formData.get("condition");
        const description = formData.get("description");

        if (!title || !price || !category || !description) return;

        const product = createProduct({
            title,
            category,
            price,
            original_price: originalPrice || null,
            image_url: imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
            eco_badge: ecoBadge || "Zero Waste",
            materials: materials || "100% Organic & Biodegradable",
            carbon_saved_kg: carbonSaved || 2.2,
            stock: stock || 15,
            condition: condition || "Brand New",
            description,
            owner_email: currentUser.email
        });

        redirect(`/products/${product.id}`);
    }

    return (
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <div style={{ marginBottom: "clamp(1.25rem, 2.5vh, 2rem)" }}>
                <Link href="/my-listings" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    <ArrowLeft size={15} /> Back to My Listings
                </Link>
                <div className="section-label">
                    <Sparkles size={13} />
                    <span>Artisan Submission</span>
                </div>
                <h1 className="page-title">Publish a Sustainable Creation</h1>
                <p className="page-subtitle">
                    List your handcrafted, upcycled, or zero-waste product in the EcoFinds marketplace.
                </p>
            </div>

            <form action={handleAddProduct} style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.25rem, 3vw, 2.25rem)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
            }}>
                {/* Title */}
                <div className="form-group">
                    <label className="input-label">Product Name / Title *</label>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="e.g. Handwoven Hemp & Cotton Table Runner"
                        className="input-field"
                    />
                </div>

                {/* Category & Condition */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="input-label">Category *</label>
                        <select name="category" required className="input-field">
                            <option value="Kitchen & Dining">Kitchen & Dining</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Home & Living">Home & Living</option>
                            <option value="Fashion & Bags">Fashion & Bags</option>
                            <option value="Food & Pantry">Food & Pantry</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="input-label">Condition *</label>
                        <select name="condition" required className="input-field">
                            <option value="Brand New">Brand New</option>
                            <option value="Upcycled Handcrafted">Upcycled Handcrafted</option>
                            <option value="Handwoven Heirloom">Handwoven Heirloom</option>
                            <option value="Refurbished Vintage">Refurbished Vintage</option>
                        </select>
                    </div>
                </div>

                {/* Pricing & Stock */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="input-label">Selling Price ($) *</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            placeholder="28.50"
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Compare-At Price ($)</label>
                        <input
                            name="original_price"
                            type="number"
                            step="0.01"
                            placeholder="36.00"
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Available Stock *</label>
                        <input
                            name="stock"
                            type="number"
                            required
                            defaultValue="20"
                            className="input-field"
                        />
                    </div>
                </div>

                {/* Eco Badge & Carbon Offset */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="input-label">Primary Eco-Badge *</label>
                        <select name="eco_badge" required className="input-field">
                            <option value="Zero Waste">Zero Waste</option>
                            <option value="Certified Organic">Certified Organic</option>
                            <option value="Upcycled">Upcycled</option>
                            <option value="Plastic-Free">Plastic-Free</option>
                            <option value="100% Compostable">100% Compostable</option>
                            <option value="Fair Trade">Fair Trade</option>
                            <option value="Non-Toxic">Non-Toxic</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="input-label">Estimated CO₂ Saved (kg)</label>
                        <input
                            name="carbon_saved_kg"
                            type="number"
                            step="0.1"
                            defaultValue="2.4"
                            className="input-field"
                        />
                    </div>
                </div>

                {/* Materials Breakdown */}
                <div className="form-group">
                    <label className="input-label">Materials & Ingredients *</label>
                    <input
                        name="materials"
                        type="text"
                        required
                        placeholder="e.g. 100% Organic Raw Flax Linen & Natural Plant Dyes"
                        className="input-field"
                    />
                </div>

                {/* Image URL with curated presets */}
                <div className="form-group">
                    <label className="input-label">Product Photography Image URL *</label>
                    <input
                        name="image_url"
                        type="url"
                        required
                        defaultValue="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                        className="input-field"
                    />
                    <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)", marginTop: "0.3rem" }}>
                        Paste any high-resolution image URL (Unsplash, Imgur, Cloudinary, etc.)
                    </div>
                </div>

                {/* Narrative Description */}
                <div className="form-group">
                    <label className="input-label">Artisan Story & Detailed Description *</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        placeholder="Detail the craftsmanship, sustainability footprint, packaging details, and care instructions..."
                        className="input-field"
                        style={{ lineHeight: 1.6 }}
                    />
                </div>

                <div style={{
                    background: "var(--badge-green-bg)",
                    border: "1px solid #BBF7D0",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem 1rem",
                    fontSize: "0.82rem",
                    color: "var(--badge-green-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                }}>
                    <ShieldCheck size={18} style={{ flexShrink: 0 }} />
                    <span>
                        By submitting, you affirm that this item complies with EcoFinds zero-plastic packaging guidelines and ethical labor standards.
                    </span>
                </div>

                <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                    <button type="submit" className="btn-primary" style={{ flex: "1 1 200px", padding: "0.85rem", fontSize: "0.95rem" }}>
                        <PlusCircle size={16} /> Publish Live to Marketplace
                    </button>
                    <Link href="/my-listings" className="btn-secondary" style={{ padding: "0.85rem 1.5rem" }}>
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
