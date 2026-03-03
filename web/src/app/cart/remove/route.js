import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthEmail } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    const email = await getAuthEmail();
    if (!email) return NextResponse.redirect(new URL('/login', request.url));

    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cart_id');

    if (cartId) {
        const db = await getDb();
        try {
            await db.collection("carts").deleteOne({ _id: new ObjectId(cartId), user_email: email });
        } catch (e) { }
    }

    return NextResponse.redirect(new URL('/cart', request.url));
}
