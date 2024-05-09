"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsPrepared } from "@/app/component/inbox-table/constants";
import { Columns, SentData } from "@/app/component/inbox-table/type";
import { SendOutlined } from "@mui/icons-material";
import { MyContexLayout } from "@/app/context";
import { intitutionCodeToLabel } from "@/utils/intitutions";

export default function PreparedScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<SentData[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);
  
  // Change after add users "selectedInstitution"
  const { setModalState, selectedInstitution } = React.useContext(
    MyContexLayout
  ) as any;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Backend have the sender like a label not a code
      const selectedInstitutionLabel = await intitutionCodeToLabel(
        selectedInstitution
      );
      await fetch(`/api/message?status=01&sender=${selectedInstitutionLabel}`)
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

  const updateMessage = useCallback(async (id: string) => {
    try {
      await fetch(
        `/api/message?id=null&family=null&areaCode=null&institutionCode=null&type=null&date=null`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, status: "05" }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("Mensaje actualizado");
          fetchData();
        });
    } catch (error) {
      console.error("Error al enviar el mensajes", error);
    }
  }, []);

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
                    updateMessage(row.id);
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
    [setModalState, updateMessage]
  );

  const newColumns = useMemo(() => {
    return [...columnsPrepared, actions];
  }, [actions]);

  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader
          amountMessages={data.length}
          title={"Mensajes Preparados"}
        />
        <DataTable
          rows={data}
          columns={newColumns as Columns[]}
          loading={isLoading}
          tableTitle={tableTitle}
        />
      </Box>
    </Paper>
  );
}
