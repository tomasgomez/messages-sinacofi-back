"use client";

import { Card, Divider, Typography } from "@mui/material";
import EnhancedTable from "@/app/component/inbox-table";
import { columnData, rowData } from "./constants";

export const CardStatusUpdate = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    <Card sx={{ width: "100%" }}>
      <Typography variant="body1" fontWeight={500} p="16px">
        Actualización de Estados de Alzamiento Hipotecario
      </Typography>
      <Divider />
      <EnhancedTable
        maxHeight={330}
        withCheckbox={false}
        rows={rowData}
        columns={columnData}
        loading={loading}
      />
    </Card>
  );
};
