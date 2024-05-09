"use client";

import { Card, Divider, Typography } from "@mui/material";
import EnhancedTable from "@/app/component/inbox-table";
import { columnData, rowData } from "./columns";

const parseDateTimeMessages = (obj: any): Date => {
  return new Date(obj.date);
};

const sortDataNewToOld = (obj: any[]): any[] => {
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(b).getTime() - parseDateTimeMessages(a).getTime()
  );
};

export const CardStatusUpdate = (props: { data?: any[] }) => {
  const dataSorted = sortDataNewToOld(props.data || []);

  return (
    <Card sx={{ width: "100%" }}>
      <Typography variant="body1" fontWeight={500} p="16px">
        Actualización de Estados de Alzamiento Hipotecario
      </Typography>
      <Divider />
      <EnhancedTable
        maxHeight={342}
        withCheckbox={false}
        rows={dataSorted}
        columns={columnData}
        highlightLastRowText="Último Estado"
        noExtraColumn
        highlightLastRow
      />
    </Card>
  );
};
