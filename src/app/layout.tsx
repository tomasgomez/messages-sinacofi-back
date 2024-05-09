"use client";
import "./globals.css";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider, Box } from "@mui/material";
import { theme } from "@/components/Theme";
import { ErrorModal } from "@/components/Modal/ErrorModal";
import SuccessModal from "@/components/Modal/SuccessModal";
import DecisionModal from "@/components/Modal/DecisionModal";
import { MyContexLayout } from "./context";
import { useState, Suspense, useEffect } from "react";
import ModalManagerProvider from "@/components/Modal/ModalManager";
import { MessageExportProvider } from "./component/MessageExportProvider";

const clearObjet = {
  type: "none" as "none",
  title: "",
  body: <></>,
  isOpen: false,
  onClose: () => null,
  onConfirm: () => null,
  onRetry: () => null,
  props: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Change after add users "selectedInstitution"
  const [selectedInstitution, setSelectedInsitution] = useState("0027");
  const [modalState, setModalState] = useState<{
    type: "success" | "error" | "decision" | "none";
    title: string;
    body?: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onRetry?: () => void;
    props?: any;
  }>(clearObjet);

  useEffect(() => {
    // Perform localStorage action
    if (!sessionStorage?.getItem("Section"))
      sessionStorage.setItem("Section", "");
  }, []);

  return (
    <html lang="en">
      <body style={{ background: "#fffffff !important" }}>
        <ModalManagerProvider>
          <MessageExportProvider>
            <ThemeProvider theme={theme}>
              <MyContexLayout.Provider
                value={{
                  setModalState,
                  selectedInstitution,
                  setSelectedInsitution,
                }}
              >
                <AppBar />
                <Box style={{ display: "flex", maxWidth: "100vw" }}>
                  <SideBar />
                  <Suspense>{children}</Suspense>
                </Box>
                {/* ///////////////////////Modal Error///////////////////////// */}
                <ErrorModal
                  title={modalState?.title}
                  body={modalState?.body}
                  withoutClose
                  onClose={() => {
                    modalState?.onClose && modalState.onClose();
                    setModalState(clearObjet);
                  }}
                  onRetry={() => {
                    modalState?.onRetry && modalState.onRetry();
                    setModalState(clearObjet);
                  }}
                  open={modalState?.isOpen && modalState.type === "error"}
                />
                {/* /////////////////////////////////////////////////////////// */}

                {/* ///////////////////////Modal Success///////////////////////// */}
                <SuccessModal
                  isOpen={modalState?.isOpen && modalState.type === "success"}
                  onClose={() => {
                    modalState?.onConfirm && modalState.onConfirm();
                    setModalState(clearObjet);
                  }}
                  title={modalState?.title}
                  body={modalState?.body}
                />
                {/* /////////////////////////////////////////////////////////// */}

                {/* ///////////////////////Modal Decision///////////////////////// */}
                <DecisionModal
                  isOpen={modalState?.isOpen && modalState.type === "decision"}
                  onClose={() => {
                    modalState?.onClose && modalState.onClose();
                    setModalState(clearObjet);
                  }}
                  onConfirm={async () => {
                    modalState?.onConfirm && (modalState.onConfirm());
                    setModalState(clearObjet);
                  }}
                  title={modalState?.title}
                  body={modalState?.body}
                />
                {/* /////////////////////////////////////////////////////////// */}
              </MyContexLayout.Provider>
            </ThemeProvider>
          </MessageExportProvider>
        </ModalManagerProvider>
      </body>
    </html>
  );
}
