"use client";
import "../globals.css";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider, Box, Container } from "@mui/material";
import { theme } from "@/components/Theme";
import { MyContexLayout } from "../context";
import { useState, Suspense } from "react";
import ModalManagerProvider from "@/components/Modal/ModalManager";
import { MessageExportProvider } from "../component/MessageExportProvider";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
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
                setCurrentInstitution,
              }}
            >
              <AppBar />
              <Box style={{ display: "flex", maxWidth: "100vw" }}>
                <SideBar />
                <Container
                  sx={{
                    maxWidth: "calc(100vw - 270px) !important",
                    maxHeight: "calc(100vh  - 67px) !important",
                    overflow: "auto",
                    padding: "0px !important",
                  }}
                >
                  <Suspense>{children}</Suspense>
                </Container>
              </Box>
            </MyContexLayout.Provider>
          </ThemeProvider>
        </MessageExportProvider>
      </ModalManagerProvider>
    </>
  );
}
