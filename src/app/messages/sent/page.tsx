"use client";
import React, { useContext, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsSent, rowOptions } from "./columns";
import { SentData } from "@/app/component/inbox-table/type";
import { MyContexLayout } from "@/app/context";
import { getMessage } from "@/app/services/common";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { useModalManager } from "@/components/Modal";

export default function SentScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<SentData[]>([]);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ErrorModal } = useModalManager();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getMessage({
        status: "05",
        origin: selectedInstitution,
      });
      setData(response);
      setIsLoading(false);
    } catch (error: unknown) {
      setData([]);
      setIsLoading(false);
      ErrorModal.open(basicError(error));
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
    <Paper sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ p: 2 }}>
        <InboxHeader amountMessages={data.length} title={"Mensajes Enviados"} />
        <DataTable
          rows={data}
          columns={columnsSent}
          loading={isLoading}
          tableTitle={tableTitle}
          rowOptions={rowOptions}
        />
      </Box>
    </Paper>
  );
}
