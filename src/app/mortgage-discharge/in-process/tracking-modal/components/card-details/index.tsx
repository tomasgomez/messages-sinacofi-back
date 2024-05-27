"use client";

import { completeInstitutions } from "@/utils/intitutions";
import { Card, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";

export const CardDetails = (props: { data: any }) => {
  const { data } = props;
  const { seller, buyer, debtor, region, institutionDestination } = data;

  return (
    <Card sx={{ minWidth: "318px" }}>
      <Typography variant="body1" fontWeight={500} p="16px">
        Detalles de Operación
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="column" gap="16px" p="16px">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="#49454F" fontSize={12}>
            Vendedor:
          </Typography>
          <Typography variant="caption">{seller}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="#49454F" fontSize={12}>
            Comprador:
          </Typography>
          <Typography variant="caption" fontSize={12}>
            {buyer}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" fontSize={12}>
          <Typography variant="caption" color="#49454F">
            Deudor:
          </Typography>
          <Typography variant="caption">{debtor}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" fontSize={12} color="#49454F">
            Región Origen:
          </Typography>
          <Typography variant="caption">{region}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" fontSize={12} color="#49454F">
            Institución Destino:
          </Typography>
          <Typography variant="caption">
            {completeInstitutions(institutionDestination)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
