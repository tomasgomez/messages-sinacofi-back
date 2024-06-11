"use client";
import Loader from "@/components/Loader";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !session) {
      signIn("oidc", { prompt: "login" });
    } else if (session && !loading) {
      router.push("/messages/inbox");
    }
  }, [session, loading]);

  if (!session) {
    return null; // If no session and still loading, do not render anything
  }

  return <Loader label="iniciando sesión…" minHeight={"100vh"} />;
}
