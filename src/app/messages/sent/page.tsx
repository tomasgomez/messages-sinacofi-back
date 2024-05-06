"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { columnsSent } from "@/app/component/inbox-table/constants";
import { Columns, SentData } from "@/app/component/inbox-table/type";
import { CopyAll, SendOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MyContexLayout } from "@/app/context";
import { intitutionCodeToLabel } from "@/utils/intitutions";

export default function SentScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const [data, setData] = React.useState<SentData[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);

  // Change after add users "selectedInsitution"
  const { selectedInsitution } = useContext(MyContexLayout) as any;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Backend have the sender like a label not a code
      const selectedInsitutionLabel = await intitutionCodeToLabel(
        selectedInsitution
      );
      await fetch(`/api/message?status=05&sender=${selectedInsitutionLabel}`)
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
  }, [selectedInsitution]);

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
              onClick={() =>
                router.push(
                  `/messages/create?institutionId=${row.receiver}&messageCode=${row.messageCode}&cloneId=${row.id}`
                )
              }
            >
              <CopyAll />
            </IconButton>
            {row.status !== "05" && (
              <IconButton
                key={`expand-icon-${row.id}`}
                aria-label="expand row"
                style={{ padding: 0 }}
              >
                <SendOutlined />
              </IconButton>
            )}
          </Box>
        );
      },
    }),
    [router]
  );

  const newColumns = useMemo(() => {
    return [...columnsSent, actions];
  }, [actions]);

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
        <InboxHeader amountMessages={data.length} title={"Mensajes Enviados"} />
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
