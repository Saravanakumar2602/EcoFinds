import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    const email = await getAuthEmail();
    if (!email) return NextResponse.redirect(new URL('/login', request.url));

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (productId) {
        const db = await getDb();
        try {
            const prod = await db.collection("products").findOne({ _id: new ObjectId(productId) });
            if (prod) {
                await db.collection("carts").insertOne({ user_email: email, product_id: prod._id });
            }
        } catch (e) { }
    }

    return NextResponse.redirect(new URL('/cart', request.url));
}
