"use client"

import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsSent } from "@/app/component/inbox-table/constants";
import { SentData } from "@/app/component/inbox-table/type";
import { mockResponse } from "./response-mock";

export default function SentScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<SentData[]>(mockResponse);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/message?type='); // TODO: endpoint api/message is not ready inside this project. Remove this when the endpoint is ready.
      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Error al solicitar mensajes");
      }
      setData(mockResponse); // TODO: MOCK API Sinacofi-V5 - remove this when the endpoint is configured inside NEXT.
      setIsLoading(false);
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
        <InboxHeader amountMessages={data.length} title={'Mensajes Enviados'}/>
        <DataTable rows={data} columns={columnsSent} loading={isLoading} />
      </Box>
    </Paper>
  );
}