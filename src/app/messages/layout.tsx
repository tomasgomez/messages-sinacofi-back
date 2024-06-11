"use client";
import "../globals.css";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider, Box } from "@mui/material";
import { theme } from "@/components/Theme";
import { ErrorModal } from "@/components/Modal/ErrorModal";
import SuccessModal from "@/components/Modal/SuccessModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { MyContexLayout } from "../context";
import { useState, Suspense } from "react";
import ModalManagerProvider from "@/components/Modal/ModalManager";
import { MessageExportProvider } from "../component/MessageExportProvider";

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  const [selectedInstitution, setSelectedInsitution] = useState();
  const [currentInstitution, setCurrentInstitution] = useState();

  return (
    <>
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
    </>
  );
}
