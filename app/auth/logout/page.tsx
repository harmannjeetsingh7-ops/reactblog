'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionCounter } from "@/app/context/globalContext";

export default function Logout() {
    const router = useRouter();
    const { setUsername } = useSessionCounter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function handleLogout() {
            const apiDomain =
                process.env.NEXT_PUBLIC_API_DOMAIN ??
                "https://comp2112-react-blog-f26.onrender.com";

            try {
                const response = await fetch(`${apiDomain}/users/logout`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`Logout failed with status ${response.status}`);
                }

                const result: unknown = await response.json();
                if (
                    typeof result !== "object" ||
                    result === null ||
                    !("success" in result) ||
                    result.success !== true
                ) {
                    throw new Error("The logout service did not confirm logout.");
                }

                if (!cancelled) {
                    setUsername(null);
                    router.replace("/");
                }
            } catch (logoutError: unknown) {
                console.error("Logout failed:", logoutError);
                if (!cancelled) {
                    setError(
                        logoutError instanceof Error
                            ? logoutError.message
                            : "Unable to log out. Please try again."
                    );
                }
            }
        }

        void handleLogout();

        return () => {
            cancelled = true;
        };
    }, [router, setUsername]);

    return (
        <main>
            <h1>{error ? "Unable to log out" : "Logging out..."}</h1>
            {error && <p role="alert">{error}</p>}
        </main>
    );
}
