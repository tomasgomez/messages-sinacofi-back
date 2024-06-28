"use client";

import React, { useContext, useEffect, useState } from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";
import InboxHeader from "@/app/component/inbox-header";
import { columnsInbox, rowOptions } from "./columns";
import { Message } from "@/app/component/inbox-table/type";
import DataTable from "../../component/inbox-table";
import { MyContexLayout } from "@/app/context";
import { getMessage } from "@/app/services/common";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { useModalManager } from "@/components/Modal";

export default function InboxScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Message[]>([]);
  // Add when the api call have pagination
  const [amountData, setAmountData] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ErrorModal } = useModalManager();

  const fetchData = async () => {
    try {
      // after backend change yo have to this change to this
      // selectedInstitution = await intitutionCodeToLabel(selectedInstitution)
      // because we have to filter by label
      setIsLoading(true);

      // Fix after have next in pagination
      const response = await getMessage({
        status: "06",
        destination: selectedInstitution,
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
          title={"Bandeja de Entrada"}
          handleRefresh={fetchData}
        />
        <DataTable
          rows={data}
          loading={isLoading}
          columns={columnsInbox}
          tableTitle={tableTitle}
          rowOptions={rowOptions}
          isExpansible
          withCheckbox
          // amountOfRows={amountData}
          // handleChangeRowsPerPageExternally={setRowsPerPage}
          // handleChangePageExternally={setPage}
          // pageExternally={page}
        />
      </Box>
    </Paper>
  );
}
