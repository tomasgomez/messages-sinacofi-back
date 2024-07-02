import React, { useEffect, createContext, useState, useCallback } from "react";
import { ModalPrint } from "./inbox-header/ModalPrint";
import { pdf, usePDF } from "@react-pdf/renderer";
import { PDFTemplate } from "./PDFTemplate";
import { Message } from "./inbox-table/type";
import { getMessageDetails } from "../services/common";
import { formatToPrint } from "@/utils/mortgage-discharge-format";

type initialinitialMessageExportType = {
  selectedMessages: [];
  setSelectedMessages: Function;
  selectedRadioButtonMessages: number | string | null;
  setSelectedRadioButtonMessages: Function;
  printPDF: boolean;
  setPrintPDF: Function;
  downloadPDF: boolean;
  setDownloadPDF: Function;
  isLoading: boolean;
  setIsLoading: Function;
  details: Message[] | [];
  setDetails: Function;
  withFormat: boolean;
  setWithFormat: Function;
};

const initialMessageExportState: initialinitialMessageExportType = {
  selectedMessages: [],
  setSelectedMessages: () => [],
  selectedRadioButtonMessages: null,
  setSelectedRadioButtonMessages: () => null,
  printPDF: true,
  setPrintPDF: () => {},
  downloadPDF: false,
  setDownloadPDF: () => {},
  isLoading: false,
  setIsLoading: () => {},
  details: [],
  setDetails: () => {},
  withFormat: false,
  setWithFormat: () => {},
};

export const MessageExportContext = createContext(initialMessageExportState);

export const MessageExportProvider = ({ children }: { children: any }) => {
  const [selectedMessages, setSelectedMessages] = useState<[]>([]);
  const [selectedRadioButtonMessages, setSelectedRadioButtonMessages] =
    useState<string | number | null>(null);
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<Message[] | []>([]);
  const [downloadPDF, setDownloadPDF] = useState<boolean>(false);
  const [withFormat, setWithFormat] = useState<boolean>(false);

  const downloadPDFFiles = async (data: Message | Message[] | any[]) => {
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
      const responseData: Message[][] = await Promise.all(
        selectedMessages.map((id) => getMessageDetails(id))
      );

      const dataDetailsCompleted: Message[] = responseData.map(
        (data) => data[0]
      );

      const dataDetailsToSet = withFormat
        ? dataDetailsCompleted.map((data) => formatToPrint(data))
        : dataDetailsCompleted;

      if (downloadPDF) {
        downloadPDFFiles(dataDetailsToSet);
      }

      setDetails(dataDetailsToSet);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [downloadPDF, selectedMessages, withFormat]);

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
      selectedRadioButtonMessages,
      setSelectedRadioButtonMessages,
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
      withFormat,
      setWithFormat,
    }),
    [
      selectedRadioButtonMessages,
      setSelectedRadioButtonMessages,
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
      withFormat,
      setWithFormat,
    ]
  );

  return (
    <MessageExportContext.Provider value={contextValue}>
      {children}
      <ModalPrint />
    </MessageExportContext.Provider>
  );
};
