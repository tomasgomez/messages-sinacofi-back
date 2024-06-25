"use client";
import "../globals.css";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider, Box, Container } from "@mui/material";
import { theme } from "@/components/Theme";
import { ErrorModal } from "@/components/Modal/ErrorModal";
import SuccessModal from "@/components/Modal/SuccessModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { MyContexLayout } from "../context";
import { useState, Suspense, useEffect } from "react";
import ModalManagerProvider from "@/components/Modal/ModalManager";
import { MessageExportProvider } from "../component/MessageExportProvider";
import { getIndCurrencies } from "../services/common";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [selectedInstitution, setSelectedInsitution] = useState();
  const [currentInstitution, setCurrentInstitution] = useState();
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    getIndCurrencies("UF")
    .then((currency: any) => {
      console.log({ currency});
      setCurrencies((prev) => ({...prev, [currency.type]: parseFloat(currency.value) }))
    });
  
  getIndCurrencies("USD")
    .then((currency: any) => {
      console.log({ currency});
      setCurrencies((prev) => ({...prev, [currency.type]: parseFloat(currency.value) }))
    });
  
  getIndCurrencies("IPV")
    .then((currency: any) => {
      console.log({ currency});
      setCurrencies((prev) => ({...prev, [currency.type]: parseFloat(currency.value) }))
    });
  }, [])
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
                currencies,
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
