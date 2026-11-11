import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getUserByEmail } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "ecofinds_super_secret_jwt_key_2026_prod";
const key = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function makeToken(email) {
    return await new SignJWT({ sub: email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(key);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, key);
        return payload;
    } catch {
        return null;
    }
}

export async function getAuthEmail() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    return payload?.sub || null;
}

export async function getAuthUser() {
    const email = await getAuthEmail();
    if (!email) return null;
    return getUserByEmail(email);
}
