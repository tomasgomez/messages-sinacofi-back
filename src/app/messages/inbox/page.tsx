"use client";

import React, { useEffect } from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";
import InboxHeader from "@/app/component/inbox-header";
import { columnsInbox } from "@/app/component/inbox-table/constants";
import { Message } from "@/app/component/inbox-table/type";
import DataTable from "../../component/inbox-table";

export default function InboxScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Message[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/message?status=06")
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error al solicitar mensajes", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableTitle = (
    <Grid container p={2}>
      <Grid pl={6} item xs={8}>
        <Typography fontWeight={600}>Recepción</Typography>
      </Grid>
      <Grid item xs={3} paddingLeft="45px">
        <Typography fontWeight={600}>Enviado</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader
          amountMessages={data.length}
          title={"Bandeja de Entrada"}
        />
        <DataTable
          rows={data}
          loading={isLoading}
          columns={columnsInbox}
          tableTitle={tableTitle}
        />
      </Box>
    </Paper>
  );
}
