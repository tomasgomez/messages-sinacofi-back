"use client";
import React, { useContext, useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<SentData[]>([]);
  // Add when the api call have pagination
  const [amountData, setAmountData] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ErrorModal } = useModalManager();

  // Fix after have next in pagination
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getMessage({
        status: "05",
        origin: selectedInstitution,
        count: 1000,
        offset: 0,
        // count: rowsPerPage,
        // offset: page * rowsPerPage,
      });
      // setAmountData(response.length);
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
  }, [selectedInstitution, page, rowsPerPage]);

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
        <InboxHeader
          amountMessages={data.length}
          title={"Mensajes Enviados"}
          handleRefresh={fetchData}
        />
        <DataTable
          rows={data}
          columns={columnsSent}
          loading={isLoading}
          tableTitle={tableTitle}
          rowOptions={rowOptions}
          // amountOfRows={amountData}
          // handleChangeRowsPerPageExternally={setRowsPerPage}
          // handleChangePageExternally={setPage}
          // pageExternally={page}
        />
      </Box>
    </Paper>
  );
}
