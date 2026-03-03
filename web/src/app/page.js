import Link from 'next/link';
import { ArrowRight, Box, Leaf, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="home-wrapper">
            <section className="hero">
                <h1 className="hero-title">Sustainable Choices for a Better Tomorrow</h1>
                <p className="hero-subtitle">Discover premium eco-friendly products, handpicked to elevate your lifestyle while protecting the planet.</p>
                <div className="hero-actions">
                    <Link href="/products" className="btn-primary">
                        Shop Now <ArrowRight size={18} />
                    </Link>
                    <Link href="/login" className="btn-secondary">
                        Join Community
                    </Link>
                </div>
            </section>

            <section className="features grid-features">
                <div className="glass-card feature-card">
                    <Leaf size={40} color="#10b981" />
                    <h3>100% Eco-Friendly</h3>
                    <p>Every product meets strict sustainability criteria to ensure a green future.</p>
                </div>
                <div className="glass-card feature-card">
                    <ShieldCheck size={40} color="#3b82f6" />
                    <h3>Verified Sellers</h3>
                    <p>We vet every vendor carefully to ensure highest quality standards.</p>
                </div>
                <div className="glass-card feature-card">
                    <Box size={40} color="#8b5cf6" />
                    <h3>Carbon Neutral Shipping</h3>
                    <p>We actively offset 100% of carbon emissions from shipping.</p>
                </div>
            </section>

            <style>{`
        .home-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          margin-top: 4rem;
        }
        .hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .grid-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
        }
        .feature-card h3 {
          font-size: 1.25rem;
        }
        .feature-card p {
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }
      `}</style>
        </div>
    );
}
