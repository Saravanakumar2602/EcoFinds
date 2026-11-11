"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ShoppingBag, PlusCircle, Search, Menu, X, Sparkles, User, Package, LogOut, ChevronRight } from "lucide-react";

export default function Navbar({ user, cartCount }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Top Announcement Bar */}
            <aside aria-label="Announcement" className="announcement-bar">
                <Sparkles size={13} color="#D97706" style={{ flexShrink: 0 }} />
                <span className="announcement-text">
                    Every order plants a native tree & supports verified zero-waste artisans. Free carbon-neutral shipping on orders over $40.
                </span>
            </aside>

            {/* Main Navbar */}
            <nav className="navbar">
                <div className="container nav-container">
                    {/* Brand */}
                    <Link href="/" className="nav-brand">
                        <div className="brand-icon">
                            <Leaf size={18} strokeWidth={2.4} />
                        </div>
                        <div className="brand-names">
                            <span className="brand-text">EcoFinds</span>
                            <span className="brand-tagline">Conscious Marketplace</span>
                        </div>
                    </Link>

                    {/* Desktop Search Bar */}
                    <form action="/products" method="GET" className="nav-search">
                        <Search size={16} />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search organic, upcycled, zero-waste..."
                        />
                    </form>

                    {/* Desktop Nav Links */}
                    <div className="nav-links desktop-only">
                        <Link href="/products" className={`nav-link ${pathname === "/products" ? "active" : ""}`}>
                            Marketplace
                        </Link>

                        {user ? (
                            <>
                                <Link href="/add-product" className={`nav-link ${pathname === "/add-product" ? "active" : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                                    <PlusCircle size={15} />
                                    <span>Sell</span>
                                </Link>

                                <Link href="/my-listings" className={`nav-link ${pathname === "/my-listings" ? "active" : ""}`}>
                                    My Listings
                                </Link>

                                <Link href="/cart" className="cart-pill" title="View Cart">
                                    <ShoppingBag size={17} />
                                    <span>Cart</span>
                                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                </Link>

                                <Link href="/profile" className="user-badge" title="Go to Profile & Orders">
                                    <img
                                        src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name)}`}
                                        alt={user.full_name}
                                        className="user-avatar"
                                    />
                                    <span>{user.full_name.split(' ')[0]}</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/cart" className="cart-pill" title="View Cart">
                                    <ShoppingBag size={17} />
                                    <span>Cart</span>
                                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                </Link>
                                <Link href="/login" className="nav-link">
                                    Log In
                                </Link>
                                <Link href="/signup" className="btn-primary btn-sm">
                                    Join EcoFinds
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="mobile-nav-controls mobile-only">
                        <Link href="/cart" className="cart-pill-mobile" title="View Cart">
                            <ShoppingBag size={19} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        <button
                            type="button"
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
                        <div className="mobile-drawer-header">
                            <div className="nav-brand">
                                <div className="brand-icon">
                                    <Leaf size={18} strokeWidth={2.4} />
                                </div>
                                <span className="brand-text">EcoFinds</span>
                            </div>
                            <button
                                type="button"
                                className="mobile-close-btn"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <form action="/products" method="GET" className="mobile-search-form" onSubmit={() => setMobileMenuOpen(false)}>
                            <Search size={16} />
                            <input
                                type="text"
                                name="search"
                                placeholder="Search sustainable goods..."
                            />
                        </form>

                        {/* User Pill in Mobile */}
                        {user ? (
                            <div className="mobile-user-card">
                                <img
                                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name)}`}
                                    alt={user.full_name}
                                    className="user-avatar"
                                    style={{ width: "42px", height: "42px" }}
                                />
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{user.full_name}</div>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}>{user.email}</div>
                                </div>
                            </div>
                        ) : null}

                        {/* Navigation Links */}
                        <div className="mobile-nav-list">
                            <Link href="/products" className="mobile-nav-item">
                                <span>Marketplace Catalog</span>
                                <ChevronRight size={16} color="var(--text-subtle)" />
                            </Link>

                            {user ? (
                                <>
                                    <Link href="/cart" className="mobile-nav-item">
                                        <span>My Cart ({cartCount})</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <Link href="/add-product" className="mobile-nav-item">
                                        <span>Sell an Artisan Creation</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <Link href="/my-listings" className="mobile-nav-item">
                                        <span>My Active Listings</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <Link href="/profile" className="mobile-nav-item">
                                        <span>Profile & Order Tracking</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <a href="/api/auth/logout" className="mobile-nav-item" style={{ color: "#EF4444" }}>
                                        <span>Sign Out</span>
                                        <LogOut size={16} />
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link href="/cart" className="mobile-nav-item">
                                        <span>My Cart ({cartCount})</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <Link href="/login" className="mobile-nav-item">
                                        <span>Log In to Account</span>
                                        <ChevronRight size={16} color="var(--text-subtle)" />
                                    </Link>
                                    <div style={{ padding: "1rem 0" }}>
                                        <Link href="/signup" className="btn-primary" style={{ width: "100%" }}>
                                            Join EcoFinds
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
