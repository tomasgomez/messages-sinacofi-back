"use client";

import React, { useContext, useEffect } from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";
import InboxHeader from "@/app/component/inbox-header";
import { columnsInbox } from "@/app/component/inbox-table/constants";
import { Message } from "@/app/component/inbox-table/type";
import DataTable from "../../component/inbox-table";
import { MyContexLayout } from "@/app/context";

export default function InboxScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Message[]>([]);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;

  const fetchData = async () => {
    try {
      // after backend change yo have to this change to this
      // selectedInstitution = await intitutionCodeToLabel(selectedInstitution)
      // because we have to filter by label
      setIsLoading(true);
      await fetch(`/api/message?status=06&receiver=${selectedInstitution}`)
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
  }, [selectedInstitution]);

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
