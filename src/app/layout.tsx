"use client";
import { useEffect } from "react";
import { SessionProvider } from "@/context/SessionProvider";
import { NextAuthProvider } from "@/context/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Perform localStorage action
    if (!sessionStorage?.getItem("Section"))
      sessionStorage.setItem("Section", "");
  }, []);

  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <body style={{ background: "#fffffff !important" }}>
        {/* {session ? */}
        <NextAuthProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
