"use client"
import React, { useEffect, useMemo } from "react";
import { Box, IconButton, Paper } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsSent } from "@/app/component/inbox-table/constants";
import { SentData } from "@/app/component/inbox-table/type";
import { CopyAll, SendOutlined } from "@mui/icons-material";

export default function SentScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<SentData[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/message?type=SENT').then(res => res.json()).then(res => {
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

  const acciones = {
    id: "actions",
    label: "Acciones",
    align: "center",
    render: ({ row }: { row: any }) => {
      return (
        <Box display={"flex"} gap={1}>
          <IconButton
            key={`expand-icon-${row.id}`}
            aria-label="expand row"
            style={{ padding: 0 }}
          >
            <CopyAll />
          </IconButton>
          <IconButton
            key={`expand-icon-${row.id}`}
            aria-label="expand row"
            style={{ padding: 0 }}
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
        <InboxHeader amountMessages={data.length} title={'Mensajes Enviados'}/>
        <DataTable rows={data} columns={newColumns} loading={isLoading} />
      </Box>
    </Paper>
  );
}