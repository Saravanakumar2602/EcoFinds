import "./globals.css";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getCart } from "@/lib/db";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "EcoFinds | Mindful Marketplace for Sustainable Living",
    description: "Discover curated, handcrafted eco-friendly essentials from verified independent artisans. 100% carbon-neutral shipping.",
    icons: {
        icon: "/icon.svg",
    },
};

export default async function RootLayout({ children }) {
    const rawUser = await getAuthUser();
    const user = rawUser ? {
        id: rawUser.id,
        email: rawUser.email,
        full_name: rawUser.full_name,
        avatar_url: rawUser.avatar_url,
        bio: rawUser.bio,
        role: rawUser.role
    } : null;

    let cartCount = 0;
    if (user?.email) {
        const cartItems = getCart(user.email);
        cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </head>
            <body suppressHydrationWarning>
                <Navbar user={user} cartCount={cartCount} />

                <main className="main-content">
                    <div className="container">
                        {children}
                    </div>
                </main>

                <footer className="footer">
                    <div className="container">
                        <div className="footer-grid">
                            <div className="footer-brand">
                                <h3>EcoFinds</h3>
                                <p>
                                    A community-powered marketplace connecting conscious consumers with verified independent artisans crafting low-impact, plastic-free heirlooms.
                                </p>
                                <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                    <span className="badge-pill badge-green" style={{ background: "rgba(235, 244, 239, 0.15)", color: "#A8D5BA" }}>
                                        🌱 100% Carbon Offset
                                    </span>
                                    <span className="badge-pill badge-clay" style={{ background: "rgba(251, 236, 231, 0.15)", color: "#F0B5A1" }}>
                                        📦 Zero Plastic Mailers
                                    </span>
                                </div>
                            </div>

                            <div className="footer-col">
                                <h4>Marketplace</h4>
                                <ul>
                                    <li><Link href="/products?category=Kitchen+%26+Dining">Kitchen & Dining</Link></li>
                                    <li><Link href="/products?category=Personal+Care">Botanical Care</Link></li>
                                    <li><Link href="/products?category=Home+%26+Living">Home & Living</Link></li>
                                    <li><Link href="/products?category=Fashion+%26+Bags">Upcycled Bags</Link></li>
                                    <li><Link href="/products?category=Food+%26+Pantry">Fair-Trade Pantry</Link></li>
                                </ul>
                            </div>

                            <div className="footer-col">
                                <h4>Community</h4>
                                <ul>
                                    <li><Link href="/add-product">Sell Your Creations</Link></li>
                                    <li><Link href="/profile">My Orders & Impact</Link></li>
                                    <li><Link href="/products?eco_badge=Upcycled">Upcycled Collection</Link></li>
                                    <li><Link href="/products?eco_badge=Zero+Waste">Zero Waste Essentials</Link></li>
                                </ul>
                            </div>

                            <div className="footer-col">
                                <h4>EcoFinds Promise</h4>
                                <p style={{ fontSize: "0.85rem", color: "#9EAEA3", lineHeight: 1.6, marginBottom: "1rem" }}>
                                    Every vendor is rigorously vetted for ethical labor, sustainable materials, and circular packaging.
                                </p>
                                <div style={{ background: "rgba(255,255,255,0.06)", padding: "0.85rem", borderRadius: "8px", fontSize: "0.8rem", color: "#D3DDD6" }}>
                                    💚 <strong>12,480+ kg</strong> of plastic diverted from oceans to date.
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <div>© {new Date().getFullYear()} EcoFinds Inc. Handcrafted for a healthier planet. All rights reserved.</div>
                            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                                <Link href="/products">Browse All</Link>
                                <Link href="/my-listings">Artisan Dashboard</Link>
                                <Link href="/profile">Impact Score</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
