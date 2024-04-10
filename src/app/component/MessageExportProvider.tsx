import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { ModalPrint } from "./inbox-header/ModalPrint";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { PDFTemplate } from "./PDFTemplate";

type initialinitialMessageExportType = {
  selectedMessages: [],
  setSelectedMessages: Function,
  printPDF: boolean,
  setPrintPDF: Function,
  downloadPDF: boolean,
  setDownloadPDF: Function,
  isLoading: boolean,
  setIsLoading: Function,
  details: [],
  setDetails: Function,
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

export const MessageExportProvider = ({ children }: { children: any}) => {

  const [selectedMessages, setSelectedMessages] = useState<[]>([]);
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [details, setDetails] = useState<any>([])
  const [downloadPDF, setDownloadPDF] = useState<boolean>(false);

  const fetchData = async () => {

    try {
      setIsLoading(true);
      const promises = selectedMessages.map(id =>
        fetch(`/api/message/detail?id=${id}`)
          .then(response => response.json())
      );

      const responseData = await Promise.all(promises);
      setDetails(responseData.map(data => data[0]));
      setIsLoading(false);
    } catch (error) {
      console.error("Error al solicitar detalle del mensajes", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(printPDF) {
      fetchData();
    }
  },[printPDF]);

  useEffect(() => {
    if(downloadPDF) {
      fetchData();
    }
  },[downloadPDF]);

  const contextValue = React.useMemo(
    () => ({
      selectedMessages, setSelectedMessages, printPDF, setPrintPDF, downloadPDF, setDownloadPDF, isLoading, setIsLoading, details, setDetails
    }),
    [
      selectedMessages, setSelectedMessages, printPDF, setPrintPDF, downloadPDF, setDownloadPDF, isLoading, setIsLoading, details, setDetails
    ],
  );

  return (
    <MessageExportContext.Provider value={contextValue}>
      {children}
      <ModalPrint />
      {/* {downloadPDF && <PDFDownloadLink download={true} document={<PDFTemplate data={[details]}/>}>a</PDFDownloadLink> } */}
    </MessageExportContext.Provider>
  );
};
