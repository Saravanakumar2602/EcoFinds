import { NextResponse } from 'next/server';
import { getProducts, getUserByEmail } from '@/lib/db';

export async function GET() {
    try {
        const products = getProducts();
        const demoUser = getUserByEmail('demo@ecofinds.com');
        return NextResponse.json({
            success: true,
            productsCount: products.length,
            firstProduct: products[0],
            demoUser: demoUser ? { email: demoUser.email, name: demoUser.full_name } : null
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message, stack: err.stack }, { status: 500 });
    }
}
