import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'data', 'ecofinds.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

export function getDatabase() {
    if (!globalThis._ecofinds_db) {
        const db = new DatabaseSync(DB_PATH);
        // Enable WAL mode for high concurrency & foreign keys
        db.exec('PRAGMA journal_mode = WAL;');
        db.exec('PRAGMA foreign_keys = ON;');
        initSchema(db);
        seedDataIfEmpty(db);
        // Ensure standard demo accounts always have valid bcrypt hash for 'password123'
        const demoHash = bcrypt.hashSync('password123', 10);
        db.prepare("UPDATE users SET password = ? WHERE email IN ('demo@ecofinds.com', 'artisan@ecofinds.com', 'clara@example.com')").run(demoHash);
        // Ensure product images are verified working URLs
        db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80' WHERE id = 1").run();
        db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' WHERE id = 2").run();
        globalThis._ecofinds_db = db;
    }
    // Self-healing updates for product images on each load
    globalThis._ecofinds_db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80' WHERE id = 1").run();
    globalThis._ecofinds_db.prepare("UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' WHERE id = 2").run();
    return globalThis._ecofinds_db;
}

function initSchema(db) {
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

function seedDataIfEmpty(db) {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (userCount > 0) return;

    // bcrypt hash of 'password123'
    const samplePasswordHash = '$2a$10$w8/JpQhTfkL.3W5fI9GfSu4fEwzXgK0l5mBfA6O2y3c8Zk9dJ1.6q';

    const insertUser = db.prepare(`
        INSERT INTO users (email, password, full_name, avatar_url, bio, role)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertUser.run(
        'demo@ecofinds.com',
        samplePasswordHash,
        'Jordan Lee',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        'Eco-conscious architect living low-impact in Portland.',
        'buyer'
    );

    insertUser.run(
        'artisan@ecofinds.com',
        samplePasswordHash,
        'Elena Rostova',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        'Artisan botanist & sustainable crafts designer with 8+ years creating low-waste lifestyle goods.',
        'seller'
    );

    insertUser.run(
        'clara@example.com',
        samplePasswordHash,
        'Clara Vance',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        'Zero waste advocate, urban forager, and plant enthusiast.',
        'buyer'
    );

    const products = [
        {
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
            title: "Solid Concentrated Shampoo & Conditioner Bar Set (Mint & Rosemary)",
            description: "Equal to three plastic shampoo bottles per bar. Hand-pressed with invigorating peppermint essential oil, French green clay, and rosemary extract to stimulate follicles and balance scalp oils. pH-balanced, vegan, and packaged in a rust-proof aluminum travel tin.",
            category: "Personal Care",
            price: 19.50,
            original_price: 25.00,
            image_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
            eco_badge: "Plastic-Free",
            carbon_saved_kg: 2.1,
            materials: "French Green Clay, Organic Cocoa Butter, Peppermint Essential Oil",
            stock: 38,
            condition: "Brand New",
            owner_email: "artisan@ecofinds.com",
            rating: 4.9,
            reviews_count: 22
        },
        {
            title: "Fair-Trade Shade-Grown Organic Coffee Beans (1kg Bag)",
            description: "Direct-trade micro-lot beans cultivated under high-canopy cloud forests in Oaxaca, Mexico. Grown alongside native shade trees that preserve migratory bird habitats. Delivers velvety tasting notes of dark chocolate, toasted hazelnut, and sweet brown sugar. Shipped in 100% home-compostable valve bags.",
            category: "Food & Pantry",
            price: 24.00,
            original_price: 29.00,
            image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
            eco_badge: "Fair Trade",
            carbon_saved_kg: 3.7,
            materials: "100% Organic Arabica Specialty Coffee",
            stock: 45,
            condition: "Fresh Roast",
            owner_email: "demo@ecofinds.com",
            rating: 5.0,
            reviews_count: 38
        },
        {
            title: "Handwoven Natural Jute & Recycled Chindi Floor Runner (2x6 ft)",
            description: "Artisan-loomed by rural women's weaving collectives using fast-growing golden jute and upcycled discarded cotton sari selvage. Reversible, naturally textured, and adds warm boho charm to hallways, kitchens, or entryways while preventing textile scrap from landfills.",
            category: "Home & Living",
            price: 52.00,
            original_price: 68.00,
            image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            eco_badge: "Fair Trade Handwoven",
            carbon_saved_kg: 6.2,
            materials: "Natural Jute Fiber & Upcycled Cotton Selvage",
            stock: 14,
            condition: "Handwoven",
            owner_email: "artisan@ecofinds.com",
            rating: 4.8,
            reviews_count: 12
        }
    ];

    const insertProd = db.prepare(`
        INSERT INTO products (
            title, description, category, price, original_price, image_url,
            eco_badge, carbon_saved_kg, materials, stock, condition, owner_email, rating, reviews_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of products) {
        insertProd.run(
            p.title, p.description, p.category, p.price, p.original_price, p.image_url,
            p.eco_badge, p.carbon_saved_kg, p.materials, p.stock, p.condition, p.owner_email, p.rating, p.reviews_count
        );
    }

    // Insert sample reviews
    const insertReview = db.prepare(`
        INSERT INTO reviews (product_id, user_email, user_name, rating, comment, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
    `);

    insertReview.run(1, 'clara@example.com', 'Clara Vance', 5, 'Such high quality! The linen pouch is super neat and the bamboo utensils feel smooth in hand, no splintering whatsoever. I keep them in my daily backpack.', '-4 days');
    insertReview.run(1, 'demo@ecofinds.com', 'Jordan Lee', 5, 'Great alternative to flimsy takeout plastic forks. Love the included coconut straw brush too.', '-12 days');
    insertReview.run(2, 'clara@example.com', 'Clara Vance', 5, 'My skin has never been softer. The lavender bar has an authentic gentle herbal smell, not overpowering like grocery store soaps.', '-2 days');
    insertReview.run(3, 'demo@ecofinds.com', 'Jordan Lee', 5, 'The sailcloth tote is practically indestructible! I carried heavy groceries in the rain and everything stayed dry.', '-7 days');
    insertReview.run(4, 'clara@example.com', 'Clara Vance', 4, 'Looks gorgeous on my bathroom vanity and smells divine. Refillable too!', '-15 days');

    // Insert sample completed order for demo user
    const insertOrder = db.prepare(`
        INSERT INTO orders (order_number, user_email, total_amount, shipping_name, shipping_address, shipping_city, shipping_zip, payment_method, status, tracking_code, carbon_offset_kg, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-3 days'))
    `);
    const orderRes = insertOrder.run(
        'ECO-8921-2026',
        'demo@ecofinds.com',
        64.00,
        'Jordan Lee',
        '742 Evergreen Terrace, Apt 4B',
        'Portland',
        '97201',
        'EcoPay Carbon Offset',
        'Delivered',
        'ECO-TRK-7849102X',
        4.3
    );

    const insertOrderItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, title, price, quantity, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertOrderItem.run(Number(orderRes.lastInsertRowid), 1, "Handcrafted Bamboo Cutlery & Straw Travel Set", 18.50, 1, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80");
    insertOrderItem.run(Number(orderRes.lastInsertRowid), 3, "Upcycled Sailcloth Everyday Market Tote", 44.00, 1, "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80");

    // Add sample item in demo user cart
    const insertCart = db.prepare(`
        INSERT INTO carts (user_email, product_id, quantity)
        VALUES (?, ?, ?)
    `);
    insertCart.run('demo@ecofinds.com', 2, 2);
}

// Data Access API
export async function getDb() {
    return getDatabase();
}

// Users
export function getUserByEmail(email) {
    if (!email) return null;
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!row) return null;
    return { ...row };
}

export function getUserById(id) {
    if (!id) return null;
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!row) return null;
    return { ...row };
}

export function createUser({ email, password, full_name, avatar_url, bio, role = 'buyer' }) {
    const db = getDatabase();
    const res = db.prepare(`
        INSERT INTO users (email, password, full_name, avatar_url, bio, role)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        email,
        password,
        full_name || email.split('@')[0],
        avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name || email)}`,
        bio || 'EcoFinds community member exploring mindful consumerism.',
        role
    );
    return getUserById(Number(res.lastInsertRowid));
}

export function updateUserProfile(email, { full_name, bio, avatar_url }) {
    const db = getDatabase();
    db.prepare(`
        UPDATE users
        SET full_name = COALESCE(?, full_name),
            bio = COALESCE(?, bio),
            avatar_url = COALESCE(?, avatar_url)
        WHERE email = ?
    `).run(full_name, bio, avatar_url, email);
    return getUserByEmail(email);
}

// Products
export function getProducts({ search, category, eco_badge, sort, limit = 50 } = {}) {
    const db = getDatabase();
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

    return db.prepare(query).all(...params);
}

export function getProductById(id) {
    if (!id) return null;
    const db = getDatabase();
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id) || null;
}

export function getProductsByOwner(ownerEmail) {
    if (!ownerEmail) return [];
    const db = getDatabase();
    return db.prepare('SELECT * FROM products WHERE owner_email = ? ORDER BY id DESC').all(ownerEmail);
}

export function createProduct({ title, description, category, price, original_price, image_url, eco_badge, carbon_saved_kg, materials, stock = 20, condition = 'Brand New', owner_email }) {
    const db = getDatabase();
    const res = db.prepare(`
        INSERT INTO products (
            title, description, category, price, original_price, image_url,
            eco_badge, carbon_saved_kg, materials, stock, condition, owner_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        title,
        description,
        category,
        Number(price),
        original_price ? Number(original_price) : null,
        image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
        eco_badge || 'Eco-Friendly',
        carbon_saved_kg ? Number(carbon_saved_kg) : 2.0,
        materials || 'Sustainable Materials',
        Number(stock) || 10,
        condition || 'Brand New',
        owner_email
    );
    return getProductById(Number(res.lastInsertRowid));
}

export function updateProduct(id, ownerEmail, data) {
    const db = getDatabase();
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
        data.title,
        data.description,
        data.category,
        data.price ? Number(data.price) : null,
        data.original_price ? Number(data.original_price) : null,
        data.image_url,
        data.eco_badge,
        data.materials,
        data.stock ? Number(data.stock) : null,
        id,
        ownerEmail
    );
    return getProductById(id);
}

export function deleteProduct(id, ownerEmail) {
    const db = getDatabase();
    return db.prepare('DELETE FROM products WHERE id = ? AND owner_email = ?').run(id, ownerEmail);
}

// Cart
export function getCart(userEmail) {
    if (!userEmail) return [];
    const db = getDatabase();
    return db.prepare(`
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
}

export function addToCart(userEmail, productId, quantity = 1) {
    if (!userEmail || !productId) return;
    const db = getDatabase();
    const existing = db.prepare('SELECT id, quantity FROM carts WHERE user_email = ? AND product_id = ?').get(userEmail, productId);
    if (existing) {
        db.prepare('UPDATE carts SET quantity = quantity + ? WHERE id = ?').run(quantity, existing.id);
    } else {
        db.prepare('INSERT INTO carts (user_email, product_id, quantity) VALUES (?, ?, ?)').run(userEmail, productId, quantity);
    }
}

export function updateCartQuantity(cartId, userEmail, newQuantity) {
    const db = getDatabase();
    if (newQuantity <= 0) {
        db.prepare('DELETE FROM carts WHERE id = ? AND user_email = ?').run(cartId, userEmail);
    } else {
        db.prepare('UPDATE carts SET quantity = ? WHERE id = ? AND user_email = ?').run(newQuantity, cartId, userEmail);
    }
}

export function removeFromCart(cartId, userEmail) {
    const db = getDatabase();
    db.prepare('DELETE FROM carts WHERE id = ? AND user_email = ?').run(cartId, userEmail);
}

export function clearCart(userEmail) {
    const db = getDatabase();
    db.prepare('DELETE FROM carts WHERE user_email = ?').run(userEmail);
}

// Orders & Checkout
export function createOrderFromCart({ userEmail, shippingName, shippingAddress, shippingCity, shippingZip, paymentMethod = 'Card' }) {
    const db = getDatabase();
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

    const orderRes = db.prepare(`
        INSERT INTO orders (
            order_number, user_email, total_amount, shipping_name,
            shipping_address, shipping_city, shipping_zip, payment_method,
            status, tracking_code, carbon_offset_kg
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', ?, ?)
    `).run(
        orderNumber,
        userEmail,
        total,
        shippingName,
        shippingAddress,
        shippingCity,
        shippingZip,
        paymentMethod,
        trackingCode,
        Number((totalCarbonSaved + 1.2).toFixed(1))
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

export function getUserOrders(userEmail) {
    if (!userEmail) return [];
    const db = getDatabase();
    const orders = db.prepare(`
        SELECT * FROM orders WHERE user_email = ? ORDER BY id DESC
    `).all(userEmail);

    for (const order of orders) {
        order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    }
    return orders;
}

export function getOrderById(orderId, userEmail) {
    const db = getDatabase();
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_email = ?').get(orderId, userEmail);
    if (!order) return null;
    order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    return order;
}

// Reviews
export function getProductReviews(productId) {
    if (!productId) return [];
    const db = getDatabase();
    return db.prepare(`
        SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC
    `).all(productId);
}

export function addReview({ productId, userEmail, userName, rating, comment }) {
    const db = getDatabase();
    db.prepare(`
        INSERT INTO reviews (product_id, user_email, user_name, rating, comment)
        VALUES (?, ?, ?, ?, ?)
    `).run(Number(productId), userEmail, userName || userEmail.split('@')[0], Number(rating), comment);

    // Update aggregate rating on product
    const stats = db.prepare(`
        SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE product_id = ?
    `).get(Number(productId));

    db.prepare(`
        UPDATE products
        SET rating = ROUND(?, 1), reviews_count = ?
        WHERE id = ?
    `).run(stats.avg_rating || 5.0, stats.count, Number(productId));
}

// User Stats
export function getUserStats(userEmail) {
    const db = getDatabase();
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
