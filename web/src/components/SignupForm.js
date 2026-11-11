"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Lock, Mail, User, ArrowRight, Eye, EyeOff, Sparkles, ShieldCheck, TreePine, HeartHandshake, ShoppingBag, Check } from "lucide-react";

export default function SignupForm({ redirectUrl = "/products", initialError = null }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer"); // "buyer" | "seller"
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialError);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!fullName.trim() || !email.trim() || !password) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    password,
                    role,
                    redirect: role === "seller" ? "/my-listings" : redirectUrl
                })
            });

            const data = await res.json();
            if (!res.ok || data.error) {
                setError(data.error || "Unable to create account. Please check your details.");
                setLoading(false);
                return;
            }

            // Successfully authenticated, navigate with session cookie hydrated
            window.location.href = data.redirect || (role === "seller" ? "/my-listings" : redirectUrl);
        } catch {
            setError("Connection error. Please check your internet connection.");
            setLoading(false);
        }
    }

    return (
        <div className="auth-split-wrapper">
            {/* Left Column: Visual Artisan Heritage Panel */}
            <div className="auth-visual-panel">
                <div className="auth-visual-pattern" />

                <div className="auth-visual-top">
                    <div className="auth-brand-badge">
                        <Leaf size={15} />
                        <span>The EcoFinds Collective</span>
                    </div>

                    <h2 className="auth-visual-title">
                        Join thousands restoring balance with every choice.
                    </h2>
                    <p className="auth-visual-desc">
                        Whether you are shopping for heirloom goods or crafting them with your own hands, you belong in our conscious circle.
                    </p>
                </div>

                {/* Artisan Benefit Pillars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
                    <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <TreePine size={18} color="#A8D5BA" />
                        </div>
                        <div>
                            <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>1 Tree Planted With Every Order</strong>
                            <p style={{ fontSize: "0.82rem", color: "#C5D6CC", margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                                Partnered with Eden Reforestation Projects to plant native mangrove trees.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <ShieldCheck size={18} color="#A8D5BA" />
                        </div>
                        <div>
                            <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>100% Zero-Plastic Guarantee</strong>
                            <p style={{ fontSize: "0.82rem", color: "#C5D6CC", margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                                Vetted biodegradable cornstarch & recycled fiber mailers strictly enforced.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <HeartHandshake size={18} color="#A8D5BA" />
                        </div>
                        <div>
                            <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>Fair Direct-to-Maker Commerce</strong>
                            <p style={{ fontSize: "0.82rem", color: "#C5D6CC", margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                                Independent artisans retain maximum revenue without predatory middleman markups.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Real Impact Badges */}
                <div className="auth-impact-grid">
                    <div className="auth-impact-item">
                        <span className="auth-impact-val">12,480 kg</span>
                        <span className="auth-impact-lbl">Ocean Plastic Diverted</span>
                    </div>
                    <div className="auth-impact-item">
                        <span className="auth-impact-val">4.9 / 5.0</span>
                        <span className="auth-impact-lbl">Verified Artisan Rating</span>
                    </div>
                    <div className="auth-impact-item">
                        <span className="auth-impact-val">0%</span>
                        <span className="auth-impact-lbl">Virgin Plastic Allowed</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Form Panel */}
            <div className="auth-form-panel">
                {/* Auth Navigation Tabs (Sign In vs Create Account) */}
                <div className="auth-tabs">
                    <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="auth-tab">
                        Sign In
                    </Link>
                    <span className="auth-tab active">
                        Create Account
                    </span>
                </div>

                <div className="auth-header">
                    <h1 className="auth-title">Join Our Circle</h1>
                    <p className="auth-subtitle">
                        Create your free account to curate sustainable finds or open your digital artisan workshop.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="auth-alert-error" role="alert">
                        <div style={{ flexShrink: 0 }}>⚠️</div>
                        <div style={{ flex: 1, fontSize: "0.85rem" }}>{error}</div>
                    </div>
                )}

                {/* Interactive Role Selector Cards */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <label className="input-label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        How do you want to participate?
                    </label>
                    <div className="auth-role-grid">
                        <div
                            onClick={() => setRole("buyer")}
                            className={`auth-role-card ${role === "buyer" ? "active" : ""}`}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="auth-role-icon-box">
                                <ShoppingBag size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <strong style={{ fontSize: "0.95rem", color: "var(--text-main)" }}>Conscious Buyer</strong>
                                    {role === "buyer" && (
                                        <div className="auth-role-check">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.25rem 0 0", lineHeight: 1.4 }}>
                                    Shop low-waste goods, track carbon diverted & plant trees.
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={() => setRole("seller")}
                            className={`auth-role-card ${role === "seller" ? "active" : ""}`}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="auth-role-icon-box artisan">
                                <Sparkles size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <strong style={{ fontSize: "0.95rem", color: "var(--text-main)" }}>Artisan / Maker</strong>
                                    {role === "seller" && (
                                        <div className="auth-role-check">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.25rem 0 0", lineHeight: 1.4 }}>
                                    Open your digital craft studio & list sustainable creations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="input-label" htmlFor="signup-name">Full Name</label>
                        <div style={{ position: "relative" }}>
                            <User size={17} className="auth-input-icon" />
                            <input
                                id="signup-name"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Clara Vance"
                                className="input-field"
                                style={{ paddingLeft: "2.5rem" }}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label" htmlFor="signup-email">Email Address</label>
                        <div style={{ position: "relative" }}>
                            <Mail size={17} className="auth-input-icon" />
                            <input
                                id="signup-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="clara@example.com"
                                className="input-field"
                                style={{ paddingLeft: "2.5rem" }}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label className="input-label" htmlFor="signup-password">Password</label>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>Min. 6 characters</span>
                        </div>
                        <div style={{ position: "relative" }}>
                            <Lock size={17} className="auth-input-icon" />
                            <input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a secure password"
                                className="input-field"
                                style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="auth-toggle-password"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary auth-submit-btn"
                    >
                        {loading ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                <span className="auth-spinner" /> Creating your account...
                            </span>
                        ) : (
                            <>
                                {role === "seller" ? "Launch Artisan Studio" : "Join EcoFinds"} <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Security Badges */}
                <div className="auth-footer-trust">
                    <div className="auth-trust-item">
                        <ShieldCheck size={14} color="var(--brand-accent)" />
                        <span>256-Bit SSL Encrypted</span>
                    </div>
                    <div className="auth-trust-item">
                        <TreePine size={14} color="var(--brand-accent)" />
                        <span>Carbon-Neutral Delivery</span>
                    </div>
                    <div className="auth-trust-item">
                        <HeartHandshake size={14} color="var(--brand-accent)" />
                        <span>Zero Spam Guarantee</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
