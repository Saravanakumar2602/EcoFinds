import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

// Safe SQLite dynamic loading without static import crashes on Node 20 / serverless
let DatabaseSyncClass = null;
try {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const sqliteModule = require('node:sqlite');
    if (sqliteModule && sqliteModule.DatabaseSync) {
        DatabaseSyncClass = sqliteModule.DatabaseSync;
    }
} catch {
    DatabaseSyncClass = null;
}

// Determine safe storage path: Vercel serverless functions only allow writes to /tmp
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_PATH = isVercel
    ? path.join('/tmp', 'ecofinds.db')
    : path.join(process.cwd(), 'data', 'ecofinds.db');

// Ensure data directory exists safely without crashing on read-only filesystems
const dataDir = path.dirname(DB_PATH);
try {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
} catch {
    // Read-only filesystem fallback
}

// Bcrypt hash of 'password123'
const DEMO_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

const INITIAL_PRODUCTS = [
    {
        id: 1,
        title: "Handcrafted Bamboo Cutlery & Straw Travel Set",
        description: "Say goodbye to single-use plastics on the go. Made from 100% organically farmed, heat-cured Moso bamboo, this lightweight travel cutlery roll includes an ergonomic fork, knife, spoon, chopsticks, drinking straw, and natural coconut-fiber cleaning brush enclosed in a washable unbleached linen pouch.",
        category: "Kitchen & Dining",
        price: 18.50,
        original_price: 24.00,
        image_url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Zero Waste",
        carbon_saved_kg: 2.4,
        materials: "100% Organic Bamboo & Unbleached Linen",
        stock: 35,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.9,
        reviews_count: 14
    },
    {
        id: 2,
        title: "Cold-Pressed Botanical Soap Trio (Lavender, Oat & Clay)",
        description: "Hand-swirled in small batches using traditional cold-process saponification. Formulated with organic olive oil, fair-trade shea butter, and essential botanicals. Completely free from palm oil, synthetic fragrances, and sulfates. Packaged in seed-embedded biodegradable paper you can plant to grow wildflowers.",
        category: "Personal Care",
        price: 14.00,
        original_price: 18.00,
        image_url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Certified Organic",
        carbon_saved_kg: 1.8,
        materials: "Organic Olive Oil, Shea Butter, Plant Botanicals",
        stock: 42,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.8,
        reviews_count: 23
    },
    {
        id: 3,
        title: "Upcycled Sailcloth Everyday Market Tote",
        description: "Crafted from decommissioned ocean racing sails that survived hundreds of nautical miles. Naturally water-resistant, ultra-durable, and built to withstand decades of daily grocery runs and beach trips. Features reinforced yachting-rope handles and inside zip pocket for keys.",
        category: "Fashion & Bags",
        price: 44.00,
        original_price: 58.00,
        image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Upcycled",
        carbon_saved_kg: 5.6,
        materials: "Upcycled Dacron Sailcloth, Marine Cordage",
        stock: 12,
        condition: "Upcycled Handcrafted",
        owner_email: "artisan@ecofinds.com",
        rating: 5.0,
        reviews_count: 8
    },
    {
        id: 4,
        title: "Recycled Amber Glass Botanical Reed Diffuser",
        description: "Fill your living space with calming notes of eucalyptus, cedarwood, and sweet orange. Blended with pure therapeutic grade essential oils and an organic sugarcane alcohol carrier. Housed in an apothecary jar blown from 100% recycled glass bottles with rattan diffuser reeds.",
        category: "Home & Living",
        price: 32.00,
        original_price: 40.00,
        image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Plastic-Free",
        carbon_saved_kg: 1.9,
        materials: "100% Post-Consumer Glass, Pure Essential Oils",
        stock: 19,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.7,
        reviews_count: 11
    },
    {
        id: 5,
        title: "GOTS Certified Belgian Flax Linen Kitchen Towels (Set of 3)",
        description: "Woven from unbleached European flax grown without synthetic fertilizers or pesticides. Stone-washed for immediate softness and unmatched absorbency. Dries twice as fast as conventional cotton and naturally resists bacterial growth. Gets softer and more pliable with every wash cycle.",
        category: "Kitchen & Dining",
        price: 26.50,
        original_price: 34.00,
        image_url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        eco_badge: "GOTS Organic",
        carbon_saved_kg: 3.1,
        materials: "100% Certified Organic Flax Linen",
        stock: 28,
        condition: "Brand New",
        owner_email: "demo@ecofinds.com",
        rating: 4.9,
        reviews_count: 19
    },
    {
        id: 6,
        title: "Hand-Poured Wildflower Honeycomb & Beeswax Candle",
        description: "Sustainably harvested cappings from family-owned ethical apiaries in the Pacific Northwest. Emits negative ions when burned to naturally cleanse household air of dust and allergens. Emits a delicate, natural sweet honey aroma without synthetic additives or paraffin.",
        category: "Home & Living",
        price: 21.00,
        original_price: 26.00,
        image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Non-Toxic",
        carbon_saved_kg: 1.2,
        materials: "100% Pure Raw Beeswax & Unbleached Cotton Wick",
        stock: 30,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.9,
        reviews_count: 16
    },
    {
        id: 7,
        title: "Vacuum Insulated Stainless Steel & Bamboo Canteen (750ml)",
        description: "Keep cold beverages crisp for 24 hours or piping hot for 12 hours. Built from food-grade 18/8 stainless steel that never leaches flavors. Capped with an FSC-certified natural bamboo lid and silicone leak-proof gasket. Wide mouth design fits whole ice cubes and is easy to clean.",
        category: "Personal Care",
        price: 29.00,
        original_price: 38.00,
        image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Zero Waste",
        carbon_saved_kg: 4.5,
        materials: "18/8 Pro-Grade Stainless Steel, FSC Bamboo, Food Silicone",
        stock: 24,
        condition: "Brand New",
        owner_email: "demo@ecofinds.com",
        rating: 4.8,
        reviews_count: 27
    },
    {
        id: 8,
        title: "Biodegradable Coconut Coir Kitchen Scrubber Sponges (5-Pack)",
        description: "Ditch microplastic-shedding synthetic green sponges forever. Made from natural coconut husk fibers bonded with tree rubber latex and stitched to an unbleached cellulose sponge base. Tough on grease yet gentle on non-stick cookware. 100% backyard compostable at end of life.",
        category: "Kitchen & Dining",
        price: 11.50,
        original_price: 15.00,
        image_url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
        eco_badge: "100% Compostable",
        carbon_saved_kg: 1.4,
        materials: "Coconut Husk Coir & Wood Cellulose",
        stock: 60,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.7,
        reviews_count: 31
    },
    {
        id: 9,
        title: "Reclaimed Walnut & Brass Desktop Organization Tray",
        description: "Hand-milled from salvaged cabinetry offcuts that would otherwise have ended up in municipal wood chipping. Finished by hand with food-safe organic walnut oil and beeswax for a rich, satin sheen. Features precision-routed channels for fountain pens, glasses, and phone.",
        category: "Home & Living",
        price: 48.00,
        original_price: 65.00,
        image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Upcycled",
        carbon_saved_kg: 4.8,
        materials: "Salvaged American Walnut & Recycled Brass",
        stock: 9,
        condition: "Handcrafted Heirloom",
        owner_email: "artisan@ecofinds.com",
        rating: 5.0,
        reviews_count: 6
    },
    {
        id: 10,
        title: "Solid Concentrated Shampoo & Conditioner Bar Set (Mint & Rosemary)",
        description: "Replace up to 6 plastic shampoo bottles per year. Hand-pressed with organic jojoba oil, pro-vitamin B5, and pure peppermint and French rosemary essential oils. Leaves hair weightlessly silky, clean, and nourished with zero SLS or artificial polymers.",
        category: "Personal Care",
        price: 22.00,
        original_price: 28.00,
        image_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        eco_badge: "Zero Waste",
        carbon_saved_kg: 2.7,
        materials: "Cold-Pressed Jojoba Oil, Essential Botanicals",
        stock: 38,
        condition: "Brand New",
        owner_email: "artisan@ecofinds.com",
        rating: 4.9,
        reviews_count: 44
    }
];

const INITIAL_USERS = [
    {
        id: 1,
        email: "demo@ecofinds.com",
        password: DEMO_PASSWORD_HASH,
        full_name: "Jordan Lee",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        bio: "Zero waste advocate, sustainability researcher, and circular economy enthusiast.",
        role: "buyer",
        created_at: "2026-11-01 10:00:00"
    },
    {
        id: 2,
        email: "artisan@ecofinds.com",
        password: DEMO_PASSWORD_HASH,
        full_name: "Elena Rostova",
        avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        bio: "Artisan botanist & sustainable crafts designer with 8+ years creating low-waste lifestyle goods.",
        role: "seller",
        created_at: "2026-11-01 10:00:00"
    },
    {
        id: 3,
        email: "clara@example.com",
        password: DEMO_PASSWORD_HASH,
        full_name: "Clara Vance",
        avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        bio: "Zero waste advocate, urban forager, and plant enthusiast.",
        role: "buyer",
        created_at: "2026-11-01 10:00:00"
    }
];

const INITIAL_REVIEWS = [
    {
        id: 1,
        product_id: 1,
        user_email: "demo@ecofinds.com",
        user_name: "Jordan Lee",
        rating: 5,
        comment: "Flawless travel companion! The fork tines are sturdy and the chopsticks feel fantastic in hand.",
        created_at: "2026-11-08 14:20:00"
    },
    {
        id: 2,
        product_id: 2,
        user_email: "clara@example.com",
        user_name: "Clara Vance",
        rating: 5,
        comment: "My skin has never been softer. The lavender bar has an authentic gentle herbal smell, not overpowering like grocery store soaps.",
        created_at: "2026-11-09 11:15:00"
    },
    {
        id: 3,
        product_id: 3,
        user_email: "demo@ecofinds.com",
        user_name: "Jordan Lee",
        rating: 5,
        comment: "This tote is a masterclass in recycling. You can literally see the sail stitching and tell it's weathered real sea winds.",
        created_at: "2026-11-10 16:45:00"
    }
];

// ============================================================================
// UNIVERSAL IN-MEMORY RELATIONAL STORE (Fallback for Vercel / serverless runtimes)
// ============================================================================
class MemoryStore {
    constructor() {
        this.users = new Map();
        this.products = new Map();
        this.carts = [];
        this.orders = new Map();
        this.orderItems = [];
        this.reviews = [];
        this.cartAutoId = 1;
        this.orderAutoId = 1;
        this.orderItemAutoId = 1;
        this.reviewAutoId = 1;
        this.productAutoId = 1;
        this.userAutoId = 1;

        this.seed();
    }

    seed() {
        for (const u of INITIAL_USERS) {
            this.users.set(u.email, { ...u });
            if (u.id >= this.userAutoId) this.userAutoId = u.id + 1;
        }

        for (const p of INITIAL_PRODUCTS) {
            this.products.set(p.id, { ...p });
            if (p.id >= this.productAutoId) this.productAutoId = p.id + 1;
        }

        for (const r of INITIAL_REVIEWS) {
            this.reviews.push({ ...r });
            if (r.id >= this.reviewAutoId) this.reviewAutoId = r.id + 1;
        }
    }
}

// Global Memory Store instance that survives within the warm serverless container
if (!globalThis._ecofinds_memstore) {
    globalThis._ecofinds_memstore = new MemoryStore();
}
// Always ensure demo user passwords match current DEMO_PASSWORD_HASH
for (const email of ['demo@ecofinds.com', 'artisan@ecofinds.com', 'clara@example.com']) {
    const existing = globalThis._ecofinds_memstore.users.get(email);
    if (existing) {
        existing.password = DEMO_PASSWORD_HASH;
        globalThis._ecofinds_memstore.users.set(email, existing);
    }
}
const mem = globalThis._ecofinds_memstore;

// ============================================================================
// SQLITE ENGINE INITIALIZATION
// ============================================================================
export function getDatabase() {
    if (!DatabaseSyncClass) return null;
    if (!globalThis._ecofinds_db) {
        try {
            const db = new DatabaseSyncClass(DB_PATH);
            try {
                db.exec('PRAGMA journal_mode = WAL;');
                db.exec('PRAGMA foreign_keys = ON;');
            } catch {}

            initSqliteSchema(db);
            seedSqliteIfEmpty(db);

            // Self-healing updates for demo passwords & verified images
            const demoHash = bcrypt.hashSync('password123', 10);
            db.prepare("UPDATE users SET password = ? WHERE email IN ('demo@ecofinds.com', 'artisan@ecofinds.com', 'clara@example.com')").run(demoHash);
            db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80' WHERE id = 1").run();
            db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' WHERE id = 2").run();

            globalThis._ecofinds_db = db;
        } catch (err) {
            console.warn('SQLite unavailable or filesystem read-only, using memory store:', err?.message || err);
            return null;
        }
    }
    return globalThis._ecofinds_db;
}

export const getDb = async () => getDatabase();

function initSqliteSchema(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL,
            avatar_url TEXT,
            bio TEXT,
            role TEXT DEFAULT 'buyer',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            original_price REAL,
            image_url TEXT NOT NULL,
            eco_badge TEXT DEFAULT 'Eco-Friendly',
            carbon_saved_kg REAL DEFAULT 1.5,
            materials TEXT DEFAULT 'Organic / Biodegradable',
            stock INTEGER DEFAULT 25,
            condition TEXT DEFAULT 'Brand New',
            owner_email TEXT NOT NULL,
            rating REAL DEFAULT 5.0,
            reviews_count INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_number TEXT UNIQUE NOT NULL,
            user_email TEXT NOT NULL,
            total_amount REAL NOT NULL,
            shipping_name TEXT NOT NULL,
            shipping_address TEXT NOT NULL,
            shipping_city TEXT NOT NULL,
            shipping_zip TEXT NOT NULL,
            payment_method TEXT DEFAULT 'Card',
            status TEXT DEFAULT 'Processing',
            tracking_code TEXT,
            carbon_offset_kg REAL DEFAULT 2.8,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER,
            title TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            image_url TEXT,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            user_email TEXT NOT NULL,
            user_name TEXT NOT NULL,
            rating INTEGER NOT NULL,
            comment TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);
}

function seedSqliteIfEmpty(db) {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get()?.count || 0;
    if (userCount > 0) return;

    const insertUser = db.prepare(`
        INSERT INTO users (email, password, full_name, avatar_url, bio, role)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const u of INITIAL_USERS) {
        insertUser.run(u.email, u.password, u.full_name, u.avatar_url, u.bio, u.role);
    }

    const insertProd = db.prepare(`
        INSERT INTO products (
            title, description, category, price, original_price, image_url,
            eco_badge, carbon_saved_kg, materials, stock, condition, owner_email, rating, reviews_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of INITIAL_PRODUCTS) {
        insertProd.run(
            p.title, p.description, p.category, p.price, p.original_price, p.image_url,
            p.eco_badge, p.carbon_saved_kg, p.materials, p.stock, p.condition, p.owner_email, p.rating, p.reviews_count
        );
    }

    const insertReview = db.prepare(`
        INSERT INTO reviews (product_id, user_email, user_name, rating, comment)
        VALUES (?, ?, ?, ?, ?)
    `);

    for (const r of INITIAL_REVIEWS) {
        insertReview.run(r.product_id, r.user_email, r.user_name, r.rating, r.comment);
    }
}

// ============================================================================
// DATA ACCESS API (Dual-Engine: SQLite or In-Memory fallback)
// ============================================================================

// Users
export function getUserByEmail(email) {
    if (!email) return null;
    const db = getDatabase();
    if (db) {
        const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        return row ? { ...row } : null;
    }
    const user = mem.users.get(email.toLowerCase());
    return user ? { ...user } : null;
}

export function getUserById(id) {
    if (!id) return null;
    const db = getDatabase();
    if (db) {
        const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        return row ? { ...row } : null;
    }
    for (const user of mem.users.values()) {
        if (user.id === Number(id)) return { ...user };
    }
    return null;
}

export function createUser({ email, password, full_name, avatar_url, bio, role = 'buyer' }) {
    const cleanEmail = email.trim().toLowerCase();
    const avatar = avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name || cleanEmail)}`;
    const userBio = bio || 'EcoFinds community member exploring mindful consumerism.';

    const db = getDatabase();
    if (db) {
        const res = db.prepare(`
            INSERT INTO users (email, password, full_name, avatar_url, bio, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(cleanEmail, password, full_name || cleanEmail.split('@')[0], avatar, userBio, role);
        return getUserById(Number(res.lastInsertRowid));
    }

    const newUser = {
        id: mem.userAutoId++,
        email: cleanEmail,
        password,
        full_name: full_name || cleanEmail.split('@')[0],
        avatar_url: avatar,
        bio: userBio,
        role,
        created_at: new Date().toISOString()
    };
    mem.users.set(cleanEmail, newUser);
    return { ...newUser };
}

export function updateUserProfile(email, { full_name, bio, avatar_url }) {
    const db = getDatabase();
    if (db) {
        db.prepare(`
            UPDATE users
            SET full_name = COALESCE(?, full_name),
                bio = COALESCE(?, bio),
                avatar_url = COALESCE(?, avatar_url)
            WHERE email = ?
        `).run(full_name, bio, avatar_url, email);
        return getUserByEmail(email);
    }

    const existing = mem.users.get(email.toLowerCase());
    if (existing) {
        if (full_name !== undefined) existing.full_name = full_name;
        if (bio !== undefined) existing.bio = bio;
        if (avatar_url !== undefined) existing.avatar_url = avatar_url;
        mem.users.set(email.toLowerCase(), existing);
        return { ...existing };
    }
    return null;
}

// Products
export function getProducts({ search, category, eco_badge, sort, limit = 50 } = {}) {
    const db = getDatabase();
    if (db) {
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (category && category !== 'All') {
            query += ' AND category = ?';
            params.push(category);
        }

        if (eco_badge && eco_badge !== 'All') {
            query += ' AND eco_badge = ?';
            params.push(eco_badge);
        }

        if (search && search.trim() !== '') {
            query += ' AND (title LIKE ? OR description LIKE ? OR materials LIKE ?)';
            const term = `%${search.trim()}%`;
            params.push(term, term, term);
        }

        switch (sort) {
            case 'price_asc':
                query += ' ORDER BY price ASC';
                break;
            case 'price_desc':
                query += ' ORDER BY price DESC';
                break;
            case 'rating':
                query += ' ORDER BY rating DESC, reviews_count DESC';
                break;
            case 'impact':
                query += ' ORDER BY carbon_saved_kg DESC';
                break;
            default:
                query += ' ORDER BY id DESC';
        }

        query += ' LIMIT ?';
        params.push(limit);

        const rows = db.prepare(query).all(...params);
        return rows.map(r => ({ ...r }));
    }

    // In-memory query implementation
    let list = Array.from(mem.products.values());

    if (category && category !== 'All') {
        list = list.filter(p => p.category === category);
    }

    if (eco_badge && eco_badge !== 'All') {
        list = list.filter(p => p.eco_badge === eco_badge);
    }

    if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        list = list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            (p.materials && p.materials.toLowerCase().includes(q))
        );
    }

    switch (sort) {
        case 'price_asc':
            list.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            list.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            list.sort((a, b) => b.rating - a.rating || b.reviews_count - a.reviews_count);
            break;
        case 'impact':
            list.sort((a, b) => (b.carbon_saved_kg || 0) - (a.carbon_saved_kg || 0));
            break;
        default:
            list.sort((a, b) => b.id - a.id);
    }

    return list.slice(0, limit).map(p => ({ ...p }));
}

export function getProductById(id) {
    if (!id) return null;
    const db = getDatabase();
    if (db) {
        const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
        return row ? { ...row } : null;
    }
    const prod = mem.products.get(Number(id));
    return prod ? { ...prod } : null;
}

export function getProductsByOwner(ownerEmail) {
    if (!ownerEmail) return [];
    const db = getDatabase();
    if (db) {
        const rows = db.prepare('SELECT * FROM products WHERE owner_email = ? ORDER BY id DESC').all(ownerEmail);
        return rows.map(r => ({ ...r }));
    }
    const list = Array.from(mem.products.values())
        .filter(p => p.owner_email === ownerEmail)
        .sort((a, b) => b.id - a.id);
    return list.map(p => ({ ...p }));
}

export function createProduct({ title, description, category, price, original_price, image_url, eco_badge, carbon_saved_kg, materials, stock = 20, condition = 'Brand New', owner_email }) {
    const db = getDatabase();
    const finalImage = image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
    const finalBadge = eco_badge || 'Eco-Friendly';
    const finalCarbon = carbon_saved_kg ? Number(carbon_saved_kg) : 2.0;
    const finalMaterials = materials || 'Sustainable Materials';
    const finalStock = Number(stock) || 10;
    const finalPrice = Number(price);
    const finalOriginalPrice = original_price ? Number(original_price) : null;

    if (db) {
        const res = db.prepare(`
            INSERT INTO products (
                title, description, category, price, original_price, image_url,
                eco_badge, carbon_saved_kg, materials, stock, condition, owner_email
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            title, description, category, finalPrice, finalOriginalPrice, finalImage,
            finalBadge, finalCarbon, finalMaterials, finalStock, condition || 'Brand New', owner_email
        );
        return getProductById(Number(res.lastInsertRowid));
    }

    const newProd = {
        id: mem.productAutoId++,
        title,
        description,
        category,
        price: finalPrice,
        original_price: finalOriginalPrice,
        image_url: finalImage,
        eco_badge: finalBadge,
        carbon_saved_kg: finalCarbon,
        materials: finalMaterials,
        stock: finalStock,
        condition: condition || 'Brand New',
        owner_email,
        rating: 5.0,
        reviews_count: 0,
        created_at: new Date().toISOString()
    };
    mem.products.set(newProd.id, newProd);
    return { ...newProd };
}

export function updateProduct(id, ownerEmail, data) {
    const numId = Number(id);
    const db = getDatabase();
    if (db) {
        db.prepare(`
            UPDATE products
            SET title = COALESCE(?, title),
                description = COALESCE(?, description),
                category = COALESCE(?, category),
                price = COALESCE(?, price),
                original_price = COALESCE(?, original_price),
                image_url = COALESCE(?, image_url),
                eco_badge = COALESCE(?, eco_badge),
                materials = COALESCE(?, materials),
                stock = COALESCE(?, stock)
            WHERE id = ? AND owner_email = ?
        `).run(
            data.title, data.description, data.category,
            data.price ? Number(data.price) : null,
            data.original_price ? Number(data.original_price) : null,
            data.image_url, data.eco_badge, data.materials,
            data.stock ? Number(data.stock) : null,
            numId, ownerEmail
        );
        return getProductById(numId);
    }

    const existing = mem.products.get(numId);
    if (existing && existing.owner_email === ownerEmail) {
        if (data.title) existing.title = data.title;
        if (data.description) existing.description = data.description;
        if (data.category) existing.category = data.category;
        if (data.price) existing.price = Number(data.price);
        if (data.original_price) existing.original_price = Number(data.original_price);
        if (data.image_url) existing.image_url = data.image_url;
        if (data.eco_badge) existing.eco_badge = data.eco_badge;
        if (data.materials) existing.materials = data.materials;
        if (data.stock !== undefined) existing.stock = Number(data.stock);
        mem.products.set(numId, existing);
        return { ...existing };
    }
    return null;
}

export function deleteProduct(id, ownerEmail) {
    const numId = Number(id);
    const db = getDatabase();
    if (db) {
        return db.prepare('DELETE FROM products WHERE id = ? AND owner_email = ?').run(numId, ownerEmail);
    }
    const existing = mem.products.get(numId);
    if (existing && existing.owner_email === ownerEmail) {
        mem.products.delete(numId);
        return { changes: 1 };
    }
    return { changes: 0 };
}

// Cart
export function getCart(userEmail) {
    if (!userEmail) return [];
    const db = getDatabase();
    if (db) {
        const rows = db.prepare(`
            SELECT 
                c.id as cart_id,
                c.quantity,
                c.created_at as added_at,
                p.id as product_id,
                p.title,
                p.description,
                p.category,
                p.price,
                p.image_url,
                p.eco_badge,
                p.carbon_saved_kg,
                p.stock,
                p.owner_email
            FROM carts c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_email = ?
            ORDER BY c.id DESC
        `).all(userEmail);
        return rows.map(r => ({ ...r }));
    }

    return mem.carts
        .filter(c => c.user_email === userEmail)
        .map(c => {
            const prod = mem.products.get(c.product_id) || {};
            return {
                cart_id: c.id,
                quantity: c.quantity,
                added_at: c.created_at,
                product_id: prod.id,
                title: prod.title,
                description: prod.description,
                category: prod.category,
                price: prod.price,
                image_url: prod.image_url,
                eco_badge: prod.eco_badge,
                carbon_saved_kg: prod.carbon_saved_kg,
                stock: prod.stock,
                owner_email: prod.owner_email
            };
        })
        .sort((a, b) => b.cart_id - a.cart_id);
}

export function addToCart(userEmail, productId, quantity = 1) {
    if (!userEmail || !productId) return;
    const numProductId = Number(productId);
    const numQty = Number(quantity) || 1;

    const db = getDatabase();
    if (db) {
        const existing = db.prepare('SELECT id, quantity FROM carts WHERE user_email = ? AND product_id = ?').get(userEmail, numProductId);
        if (existing) {
            db.prepare('UPDATE carts SET quantity = quantity + ? WHERE id = ?').run(numQty, existing.id);
        } else {
            db.prepare('INSERT INTO carts (user_email, product_id, quantity) VALUES (?, ?, ?)').run(userEmail, numProductId, numQty);
        }
        return;
    }

    const existing = mem.carts.find(c => c.user_email === userEmail && c.product_id === numProductId);
    if (existing) {
        existing.quantity += numQty;
    } else {
        mem.carts.push({
            id: mem.cartAutoId++,
            user_email: userEmail,
            product_id: numProductId,
            quantity: numQty,
            created_at: new Date().toISOString()
        });
    }
}

export function updateCartQuantity(cartId, userEmail, newQuantity) {
    const numId = Number(cartId);
    const numQty = Number(newQuantity);

    const db = getDatabase();
    if (db) {
        if (numQty <= 0) {
            db.prepare('DELETE FROM carts WHERE id = ? AND user_email = ?').run(numId, userEmail);
        } else {
            db.prepare('UPDATE carts SET quantity = ? WHERE id = ? AND user_email = ?').run(numQty, numId, userEmail);
        }
        return;
    }

    const idx = mem.carts.findIndex(c => c.id === numId && c.user_email === userEmail);
    if (idx !== -1) {
        if (numQty <= 0) {
            mem.carts.splice(idx, 1);
        } else {
            mem.carts[idx].quantity = numQty;
        }
    }
}

export function removeFromCart(cartId, userEmail) {
    const numId = Number(cartId);
    const db = getDatabase();
    if (db) {
        db.prepare('DELETE FROM carts WHERE id = ? AND user_email = ?').run(numId, userEmail);
        return;
    }
    mem.carts = mem.carts.filter(c => !(c.id === numId && c.user_email === userEmail));
}

export function clearCart(userEmail) {
    const db = getDatabase();
    if (db) {
        db.prepare('DELETE FROM carts WHERE user_email = ?').run(userEmail);
        return;
    }
    mem.carts = mem.carts.filter(c => c.user_email !== userEmail);
}

// Orders & Checkout
export function createOrderFromCart({ userEmail, shippingName, shippingAddress, shippingCity, shippingZip, paymentMethod = 'Card' }) {
    const cartItems = getCart(userEmail);
    if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
    }

    let total = 0;
    let totalCarbonSaved = 0;
    for (const item of cartItems) {
        total += item.price * item.quantity;
        totalCarbonSaved += (item.carbon_saved_kg || 1.5) * item.quantity;
    }

    const orderNumber = `ECO-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
    const trackingCode = `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const db = getDatabase();
    if (db) {
        const orderRes = db.prepare(`
            INSERT INTO orders (
                order_number, user_email, total_amount, shipping_name,
                shipping_address, shipping_city, shipping_zip, payment_method,
                status, tracking_code, carbon_offset_kg
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', ?, ?)
        `).run(
            orderNumber, userEmail, total, shippingName,
            shippingAddress, shippingCity, shippingZip, paymentMethod,
            trackingCode, Number((totalCarbonSaved + 1.2).toFixed(1))
        );

        const orderId = Number(orderRes.lastInsertRowid);
        const insertItem = db.prepare(`
            INSERT INTO order_items (order_id, product_id, title, price, quantity, image_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const updateStock = db.prepare(`
            UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?
        `);

        for (const item of cartItems) {
            insertItem.run(orderId, item.product_id, item.title, item.price, item.quantity, item.image_url);
            updateStock.run(item.quantity, item.product_id);
        }

        clearCart(userEmail);
        return getOrderById(orderId, userEmail);
    }

    // In-memory order creation
    const orderId = mem.orderAutoId++;
    const newOrder = {
        id: orderId,
        order_number: orderNumber,
        user_email: userEmail,
        total_amount: total,
        shipping_name: shippingName,
        shipping_address: shippingAddress,
        shipping_city: shippingCity,
        shipping_zip: shippingZip,
        payment_method: paymentMethod,
        status: 'Confirmed',
        tracking_code: trackingCode,
        carbon_offset_kg: Number((totalCarbonSaved + 1.2).toFixed(1)),
        created_at: new Date().toISOString()
    };
    mem.orders.set(orderId, newOrder);

    for (const item of cartItems) {
        mem.orderItems.push({
            id: mem.orderItemAutoId++,
            order_id: orderId,
            product_id: item.product_id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image_url: item.image_url
        });
        const prod = mem.products.get(item.product_id);
        if (prod) {
            prod.stock = Math.max(0, prod.stock - item.quantity);
            mem.products.set(item.product_id, prod);
        }
    }

    clearCart(userEmail);
    return getOrderById(orderId, userEmail);
}

export function getUserOrders(userEmail) {
    if (!userEmail) return [];
    const db = getDatabase();
    if (db) {
        const orders = db.prepare('SELECT * FROM orders WHERE user_email = ? ORDER BY id DESC').all(userEmail);
        for (const order of orders) {
            order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
        }
        return orders.map(o => ({ ...o }));
    }

    const list = Array.from(mem.orders.values())
        .filter(o => o.user_email === userEmail)
        .sort((a, b) => b.id - a.id)
        .map(o => {
            const items = mem.orderItems.filter(it => it.order_id === o.id);
            return { ...o, items };
        });
    return list;
}

export function getOrderById(orderId, userEmail) {
    const numId = Number(orderId);
    const db = getDatabase();
    if (db) {
        const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_email = ?').get(numId, userEmail);
        if (!order) return null;
        order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
        return { ...order };
    }

    const order = mem.orders.get(numId);
    if (!order || (userEmail && order.user_email !== userEmail)) return null;
    const items = mem.orderItems.filter(it => it.order_id === numId);
    return { ...order, items };
}

// Reviews
export function getProductReviews(productId) {
    if (!productId) return [];
    const numId = Number(productId);
    const db = getDatabase();
    if (db) {
        const rows = db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC').all(numId);
        return rows.map(r => ({ ...r }));
    }

    return mem.reviews
        .filter(r => r.product_id === numId)
        .sort((a, b) => b.id - a.id)
        .map(r => ({ ...r }));
}

export function addReview({ productId, userEmail, userName, rating, comment }) {
    const numProductId = Number(productId);
    const numRating = Number(rating);
    const authorName = userName || userEmail.split('@')[0];

    const db = getDatabase();
    if (db) {
        db.prepare(`
            INSERT INTO reviews (product_id, user_email, user_name, rating, comment)
            VALUES (?, ?, ?, ?, ?)
        `).run(numProductId, userEmail, authorName, numRating, comment);

        const stats = db.prepare(`
            SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE product_id = ?
        `).get(numProductId);

        db.prepare(`
            UPDATE products
            SET rating = ROUND(?, 1), reviews_count = ?
            WHERE id = ?
        `).run(stats.avg_rating || 5.0, stats.count, numProductId);
        return;
    }

    mem.reviews.push({
        id: mem.reviewAutoId++,
        product_id: numProductId,
        user_email: userEmail,
        user_name: authorName,
        rating: numRating,
        comment,
        created_at: new Date().toISOString()
    });

    // Update product rating aggregate
    const prodReviews = mem.reviews.filter(r => r.product_id === numProductId);
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    const prod = mem.products.get(numProductId);
    if (prod) {
        prod.rating = Number(avg.toFixed(1));
        prod.reviews_count = prodReviews.length;
        mem.products.set(numProductId, prod);
    }
}

// User Stats
export function getUserStats(userEmail) {
    const db = getDatabase();
    if (db) {
        const orderStats = db.prepare(`
            SELECT COUNT(*) as total_orders, COALESCE(SUM(total_amount), 0) as total_spent, COALESCE(SUM(carbon_offset_kg), 0) as total_carbon
            FROM orders WHERE user_email = ?
        `).get(userEmail) || { total_orders: 0, total_spent: 0, total_carbon: 0 };

        const listingsCount = db.prepare(`
            SELECT COUNT(*) as count FROM products WHERE owner_email = ?
        `).get(userEmail)?.count || 0;

        return {
            totalOrders: orderStats.total_orders,
            totalSpent: orderStats.total_spent,
            totalCarbonSaved: Number(orderStats.total_carbon.toFixed(1)),
            treesPlanted: Math.floor(orderStats.total_orders * 1.5) + (listingsCount > 0 ? 2 : 0),
            activeListings: listingsCount
        };
    }

    const userOrders = Array.from(mem.orders.values()).filter(o => o.user_email === userEmail);
    const totalSpent = userOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const totalCarbon = userOrders.reduce((sum, o) => sum + (o.carbon_offset_kg || 0), 0);
    const listingsCount = Array.from(mem.products.values()).filter(p => p.owner_email === userEmail).length;

    return {
        totalOrders: userOrders.length,
        totalSpent,
        totalCarbonSaved: Number(totalCarbon.toFixed(1)),
        treesPlanted: Math.floor(userOrders.length * 1.5) + (listingsCount > 0 ? 2 : 0),
        activeListings: listingsCount
    };
}
