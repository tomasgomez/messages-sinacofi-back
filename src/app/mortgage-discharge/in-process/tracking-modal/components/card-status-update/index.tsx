"use client";

import { Card, Divider, Typography } from "@mui/material";
import EnhancedTable from "@/app/component/inbox-table";
import { columnData, rowData } from "./columns";

export const CardStatusUpdate = (props: { data?: any[] }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <Typography variant="body1" fontWeight={500} p="16px">
        Actualización de Estados de Alzamiento Hipotecario
      </Typography>
      <Divider />
      <EnhancedTable
        maxHeight={342}
        withCheckbox={false}
        rows={props?.data || []}
        columns={columnData}
        highlightLastRowText="Último Estado"
        noExtraColumn
        highlightLastRow
      />
    </Card>
  );
};
