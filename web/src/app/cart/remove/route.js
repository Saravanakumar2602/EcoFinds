import { NextResponse } from 'next/server';
import { removeFromCart } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cart_id');

    if (cartId) {
        try {
            removeFromCart(Number(cartId), user.email);
        } catch (e) {
            console.error('Error removing from cart:', e);
        }
    }

    return NextResponse.redirect(new URL('/cart', request.url));
}
