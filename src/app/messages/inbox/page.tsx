"use client"

import React, { useEffect } from "react";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import InboxHeader from "@/app/component/inbox-header";
import { columnsInbox } from "@/app/component/inbox-table/constants";
import { Data } from "@/app/component/inbox-table/type";
import DataTable from "../../component/inbox-table";
import { rows } from "./mock";
import { PDFTemplate } from "@/app/component/PDFTemplate";
import { mockMS199 } from "./mock-ms-199";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Modal } from '../../component/Modal';
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";

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

  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader amountMessages={rows.length} title={'Bandeja de Entrada'} />
        <DataTable rows={data} loading={isLoading} columns={columnsInbox} />
      </Box>
    </Paper>
  );
};
