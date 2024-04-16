'use client';

import { Card, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";

export const CardDetails = () => {
    return (
    <Card sx={{ minWidth: '318px' }}>
        <Typography variant="body1" fontWeight={500} p="16px">
          Detalles de Operación
        </Typography>
        <Divider />
        <Box display="flex" flexDirection="column" gap="16px" p="16px">
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color='#49454F' fontSize={12}>
                    Vendedor:
                </Typography>
                <Typography variant="caption">
                    12.345.768-9 Carolina Lopez Ruiz
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color='#49454F' fontSize={12}>
                    Comprador:
                </Typography>
                <Typography variant="caption" fontSize={12}>
                    98.765.432-1 Juan Pérez
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" fontSize={12}>
                <Typography variant="caption" color='#49454F'>
                    Deudor:
                </Typography>
                <Typography variant="caption">
                    98.765.432-1 Juan Pérez
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" fontSize={12} color='#49454F'>
                    Región Origen:
                </Typography>
                <Typography variant="caption">
                    Metropolitana - Santiago, Chile
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" fontSize={12} color='#49454F'>
                    Institución Destino:
                </Typography>
                <Typography variant="caption">
                    0045 - B. Estado
                </Typography>
            </Box>
        </Box>
    </Card>)
};
