import LoginForm from "@/components/LoginForm";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }) {
    const user = await getAuthUser();
    const params = await searchParams;
    const redirectUrl = params?.redirect || "/products";

    if (user) {
        redirect(redirectUrl);
    }

    const initialError = params?.error ? decodeURIComponent(params.error) : null;

    return (
        <div style={{ padding: "clamp(0.5rem, 2vh, 1.75rem) 0 clamp(1.5rem, 3vh, 2.5rem)" }}>
            <LoginForm redirectUrl={redirectUrl} initialError={initialError} />
        </div>
    );
}
