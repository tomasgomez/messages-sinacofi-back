"use client";
import "./globals.css";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider, Box } from "@mui/material";
import { theme } from "@/components/Theme";
import { ErrorModal } from "@/components/Modal/ErrorModal";
import SuccessModal from "@/components/Modal/SuccessModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { MyContexLayout } from "./context";
import { useState, Suspense, useEffect, useContext } from "react";
import ModalManagerProvider from "@/components/Modal/ModalManager";
import { MessageExportProvider } from "./component/MessageExportProvider";
import { SessionProvider, SessionProviderContext } from "@/context/SessionProvider";
import { NextAuthProvider } from "@/context/NextAuthProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Change after add users "selectedInstitution"
  const [selectedInstitution, setSelectedInsitution] = useState();
  const [currentInstitution, setCurrentInstitution] = useState();

  useEffect(() => {
    // Perform localStorage action
    if (!sessionStorage?.getItem("Section"))
      sessionStorage.setItem("Section", "");
  }, []);

  return (
    <html lang="en">
      <body style={{ background: "#fffffff !important" }}>
        <NextAuthProvider>
          <SessionProvider>
            <ModalManagerProvider>
              <MessageExportProvider>
                <ThemeProvider theme={theme}>
                  <MyContexLayout.Provider
                    value={{
                      selectedInstitution,
                      setSelectedInsitution,
                      currentInstitution,
                      setCurrentInstitution
                    }}
                  >
                    <AppBar />
                    <Box style={{ display: "flex", maxWidth: "100vw" }}>
                      <SideBar />
                      <Suspense>{children}</Suspense>
                    </Box>
                  </MyContexLayout.Provider>
                </ThemeProvider>
              </MessageExportProvider>
            </ModalManagerProvider>
          </SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
