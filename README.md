<div align="center">
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&style=for-the-badge" alt="Vercel Deployed" />
  <img src="https://img.shields.io/badge/Next.js-15.1-black?logo=next.js&style=for-the-badge" alt="Next.js" />
  <img src="https://img.shields.io/badge/Status-Hackathon_Ready-success?style=for-the-badge" alt="Hackathon Ready" />
</div>

<br />

<div align="center">
  <h1 align="center">🌿 EcoFinds</h1>
  <p align="center">
    <strong>Sustainable Choices for a Better Tomorrow</strong>
    <br />
    A premium, full-stack marketplace built specifically for eco-friendly products.
    <br />
    <br />
    <a href="https://eco-finds-liart-tau.vercel.app/"><strong>🔥 View Live Demo »</strong></a>
    <br />
  </p>
</div>

---

## ✨ Why EcoFinds?
EcoFinds was created to prioritize environmental sustainability without sacrificing a modern, premium user experience. We actively connect buyers with verified vendors to ensure high-quality standards and carbon-neutral shipping offsets.

### 🌟 Key Features
- **Seamless E-Commerce Flow:** Fully functional shopping cart, checkout processing, and real-time total calculations.
- **Glassmorphic Design:** A highly customized, premium UI utilizing translucent backgrounds, custom `globals.css` design tokens, and smooth micro-animations.
- **User Authentication:** Complete Login and Sign Up functionality built with secure Server Actions and `jose` generated JWT cookies.
- **Vendor Dashboards:** Authenticated users can securely list new items to the marketplace and view their past purchase histories.
- **Dynamic Content Fallbacks:** Automatic CSS ambient gradient generation for beautiful visual placeholders.

## 🛠 Tech Stack
- **Frontend & Backend Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Authentication:** `bcryptjs` and `jose`
- **Iconography:** `lucide-react`
- **Design System:** Vanilla CSS 3 (Zero Dependencies Layout)
- **Deployment:** Vercel Global Edge Network

## 🚀 Running Locally

The application is completely self-contained and utilizes an in-memory database configuration, meaning you don't even need to configure `.env` variables to start coding!

```bash
# 1. Clone the repository
git clone https://github.com/Saravanakumar2602/EcoFinds.git

# 2. Enter the workspace
cd EcoFinds/web

# 3. Install packages
npm install

# 4. Start the development server!
npm run dev
```
Navigate to `http://localhost:3000` to see your running instance.

## 📂 Project Architecture
```text
EcoFinds/
└── web/                    # Unified Next.js Workspace
    ├── public/             # Static Assets
    ├── src/
    │   ├── app/            # App Router (Pages, UI, and Server Actions)
    │   │   ├── api/        # Next.js Route Handlers
    │   │   ├── cart/       # E-Commerce functionalities
    │   │   ├── login/      # Auth Pages
    │   │   ├── products/   # Marketplace Feed
    │   │   └── globals.css # Premium Styling Engine
    │   └── lib/            
    │       ├── auth.js     # JWT Security Configuration
    │       └── db.js       # Database Connectivity 
    └── package.json        
```

---
*Created with ❤️ for the Odoo Hackathon.*
