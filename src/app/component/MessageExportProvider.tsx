import React, { useEffect, createContext, useState, useCallback } from "react";
import { ModalPrint } from "./inbox-header/ModalPrint";
import { pdf, usePDF } from "@react-pdf/renderer";
import { PDFTemplate } from "./PDFTemplate";
import { Message } from "./inbox-table/type";
import { getMessageDetails } from "../services/common";

type initialinitialMessageExportType = {
  selectedMessages: [];
  setSelectedMessages: Function;
  printPDF: boolean;
  setPrintPDF: Function;
  downloadPDF: boolean;
  setDownloadPDF: Function;
  isLoading: boolean;
  setIsLoading: Function;
  details: Message[] | [];
  setDetails: Function;
};

const initialMessageExportState: initialinitialMessageExportType = {
  selectedMessages: [],
  setSelectedMessages: () => [],
  printPDF: true,
  setPrintPDF: () => {},
  downloadPDF: false,
  setDownloadPDF: () => {},
  isLoading: false,
  setIsLoading: () => {},
  details: [],
  setDetails: () => {},
};

export const MessageExportContext = createContext(initialMessageExportState);

export const MessageExportProvider = ({ children }: { children: any }) => {
  const [selectedMessages, setSelectedMessages] = useState<[]>([]);
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<Message[] | []>([]);
  const [downloadPDF, setDownloadPDF] = useState<boolean>(false);

  const downloadPDFFiles = async (data: Message | Message[]) => {
    const instance = pdf(<PDFTemplate data={data} />);
    try {
      const blob = await instance.toBlob();
      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "MS-Detalles.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloadPDF(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const responseData = await Promise.all(
        selectedMessages.map((id) => getMessageDetails(id))
      );
      const data = responseData.map((data) => data[0]);
      setDetails(data);
      setIsLoading(false);
      if (downloadPDF) {
        downloadPDFFiles(data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [downloadPDF, selectedMessages]);

  useEffect(() => {
    if (printPDF) {
      fetchData();
    }
  }, [fetchData, printPDF]);

  useEffect(() => {
    if (downloadPDF) {
      fetchData();
    }
  }, [fetchData, downloadPDF]);

  const contextValue = React.useMemo(
    () => ({
      selectedMessages,
      setSelectedMessages,
      printPDF,
      setPrintPDF,
      downloadPDF,
      setDownloadPDF,
      isLoading,
      setIsLoading,
      details,
      setDetails,
    }),
    [
      selectedMessages,
      setSelectedMessages,
      printPDF,
      setPrintPDF,
      downloadPDF,
      setDownloadPDF,
      isLoading,
      setIsLoading,
      details,
      setDetails,
    ]
  );

  return (
    <MessageExportContext.Provider value={contextValue}>
      {children}
      <ModalPrint />
    </MessageExportContext.Provider>
  );
};
