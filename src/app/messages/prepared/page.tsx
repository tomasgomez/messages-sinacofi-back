"use client";

import React, { useState, useEffect, useContext, useMemo } from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsPrepared, rowOptions } from "./columns";
import { Columns, SentData } from "@/app/component/inbox-table/type";
import { SendOutlined } from "@mui/icons-material";
import { MyContexLayout } from "@/app/context";
import { updateMessage } from "../api-calls";
import { getMessage } from "@/app/services/common";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";

export default function PreparedScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<SentData[]>([]);

  // Add when the api call have pagination
  const [amountData, setAmountData] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ConfirmModal, ErrorModal } = useModalManager();

  // Fix after have next in pagination
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getMessage({
        status: "01",
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
        <Typography fontWeight={600}>Preparado</Typography>
      </Grid>
      <Grid item xs={3} paddingLeft="45px">
        <Typography fontWeight={600}>Enviado</Typography>
      </Grid>
    </Grid>
  );

  const actions = useMemo(
    () => ({
      id: "actions",
      label: "Acciones",
      render: ({ row }: { row: any }) => {
        const { id = "", TSN = "" } = row || {};
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              key={`expand-icon-${id}`}
              aria-label="expand row"
              style={{ padding: 0 }}
              onClick={() => {
                ConfirmModal.open({
                  title: "¿Quieres enviar este mensaje?",
                  body: (
                    <Typography
                      fontSize={14}
                      fontWeight={400}
                      style={{ paddingBottom: 16 }}
                    >
                      TSN: {TSN}
                    </Typography>
                  ),
                  onConfirm: async () => {
                    updateMessage(id);
                  },
                });
              }}
            >
              <SendOutlined />
            </IconButton>
          </Box>
        );
      },
    }),
    [ConfirmModal, updateMessage]
  );

  const newColumns = useMemo(() => {
    return [...columnsPrepared, actions];
  }, [actions]);

  return (
    <Paper sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ p: 2 }}>
        <InboxHeader
          amountMessages={data.length}
          title={"Mensajes Preparados"}
          handleRefresh={fetchData}
        />
        <DataTable
          rows={data}
          columns={newColumns as Columns[]}
          loading={isLoading}
          tableTitle={tableTitle}
          rowOptions={rowOptions}
          highlightRowDisabled
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
