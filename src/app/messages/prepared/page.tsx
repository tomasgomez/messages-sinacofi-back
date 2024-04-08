"use client";

import React, { useEffect, useMemo } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsSent } from "@/app/component/inbox-table/constants";
import { SentData } from "@/app/component/inbox-table/type";
import { mockResponse } from "./response-mock";
import { SendOutlined } from "@mui/icons-material";
import { MyContexLayout } from "@/app/context";

export default function PreparedScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<SentData[]>(mockResponse);

  const { setModalState } = React.useContext(MyContexLayout) as any;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/message?type=').then(res => res.json()).then(res => {
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
  }, []);

  const acciones = {
    id: "actions",
    label: "Acciones",
    align: "center",
    render: ({ row }: { row: any }) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            key={`expand-icon-${row.id}`}
            aria-label="expand row"
            style={{ padding: 0 }}
            onClick={() => {
              setModalState({
                type: "decision",
                title: "¿Quieres enviar esta mensaje?",
                body: (
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    style={{ paddingBottom: 16 }}
                  >
                    TSN: {row?.TSN}
                  </Typography>
                ),
                isOpen: true,
                onConfirm: async () => {
                  console.log("Eliminar mensaje");
                },
              });
            }}
          >
            <SendOutlined />
          </IconButton>
        </Box>
      );
    },
  };

  const newColumns = useMemo(() => {
    return [...columnsSent, acciones];
  }, [columnsSent, acciones]);

  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader
          amountMessages={data.length}
          title={"Mensajes Preparados"}
        />
        <DataTable rows={data} columns={newColumns} loading={isLoading} />
      </Box>
    </Paper>
  );
}
