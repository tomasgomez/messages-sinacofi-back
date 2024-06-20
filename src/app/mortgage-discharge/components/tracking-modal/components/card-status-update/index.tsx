"use client";

import { Card, Divider, Typography } from "@mui/material";
import EnhancedTable from "@/app/component/inbox-table";
import { columnData, rowOptions } from "./columns";
import Loader from "@/components/Loader";
import { StyledFooterComponent, StyledCircle } from "../../styles";

export const CardStatusUpdate = (props: { data?: any[]; loading: boolean }) => {
  const { data = [], loading = false } = props || {};

  const footerComponent = (
    <StyledFooterComponent>
      <StyledCircle />
      <Typography fontSize={12}>Último Estado</Typography>
    </StyledFooterComponent>
  );

  return (
    <Card sx={{ width: "100%" }}>
      <Typography variant="body1" fontWeight={500} p="16px">
        Actualización de Estados de Alzamiento Hipotecario
      </Typography>
      <Divider />
      <EnhancedTable
        loading={loading}
        maxHeight={280}
        withCheckbox={false}
        rows={data}
        columns={columnData}
        rowOptions={rowOptions}
        footerComponent={footerComponent}
        highlightLastRow
        rowsPerPageOptions={[]}
        defaultRowsPerPage={4}
      />
    </Card>
  );
};
