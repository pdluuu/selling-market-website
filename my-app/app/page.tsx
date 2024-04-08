"use client";
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();

    if (!window.localStorage.getItem("access_token")) {
        router.push("/auth/login");
    }
    return (
        <button type="button" onClick={() => router.push("/dashboard")}>
            Dashboard
        </button>
    );
}
