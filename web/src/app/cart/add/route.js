import { NextResponse } from 'next/server';
import { addToCart } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
    const user = await getAuthUser();
    if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', '/cart');
        return NextResponse.redirect(loginUrl);
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    const quantity = parseInt(searchParams.get('qty') || '1', 10);

    if (productId) {
        try {
            addToCart(user.email, Number(productId), quantity);
        } catch (e) {
            console.error('Error adding to cart:', e);
        }
    }

    return NextResponse.redirect(new URL('/cart', request.url));
}
