"use client"

import React, { useEffect } from "react";

import { Box, Button, Paper } from "@mui/material";
import InboxHeader from "@/app/component/inbox-header";
import { columnsInbox } from "@/app/component/inbox-table/constants";
import { Data } from "@/app/component/inbox-table/type";
import DataTable from "../../component/inbox-table";
import { rows } from "./mock";
import { BlobProvider, PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { PDFTemplate } from "@/app/component/PDFTemplate";

export default function InboxScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Data[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/message?status=06').then(res => res.json()).then(res => {
        setData(res)
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error al solicitar mensajes", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  // const [instance, updateInstance] = usePDF({ document: <PDFTemplate data={[]}/> });
  // console.log('# PDF', instance.blob);
  // const downloadPDF = async () => {
  //   try {
  //     const blob = instance.blob;
  //     const url = window.URL.createObjectURL(blob as Blob);

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'your_pdf_name.pdf'; // Specify the name of the downloaded file
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     // Clean up
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //   }
  // };

  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}> 
        
        <InboxHeader amountMessages={rows.length} title={'Bandeja de Entrada'} />
        <DataTable rows={data} loading={isLoading} columns={columnsInbox} />
      </Box>
    </Paper>
  );
};
