import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { getAuthEmail } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "EcoFinds | Sustainable Shopping",
    description: "A premium marketplace for eco-friendly products.",
};

export default async function RootLayout({ children }) {
    const email = await getAuthEmail();

    return (
        <html lang="en">
            <body className={inter.variable}>
                <nav className="navbar">
                    <div className="container nav-container">
                        <Link href="/" className="nav-logo">
                            <Leaf size={24} color="#10b981" />
                            EcoFinds
                        </Link>
                        <div className="nav-links">
                            <Link href="/products" className="nav-link">Marketplace</Link>
                            {email ? (
                                <>
                                    <Link href="/cart" className="nav-link">Cart</Link>
                                    <Link href="/my-listings" className="nav-link">My Listings</Link>
                                    <Link href="/profile" className="nav-link">Profile ({email.split('@')[0]})</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="nav-link">Log In</Link>
                                    <Link href="/signup" className="btn-primary">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="main-content">
                    <div className="container">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
