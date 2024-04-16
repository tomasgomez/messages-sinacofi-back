'use client';

import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const MortgageStatusDropdown = () => {
    const options = [
        { label: "021 - Evaluación Alzamiento Hipotecario En Proceso", value: "021" },
        { label: "022 - Evaluación Alzamiento Hipotecario Aceptada", value: "022" },
        { label: "023 - Evaluación Alzamiento Hipotecario Rechazada", value: "023" },
        { label: "041 - Firma de Escritura en Proceso", value: "041" },
        { label: "042 - Escritura Firmada", value: "042" },
    ];
    const [optionSelected, setOptionSelected] = React.useState(options[0].value);
   

    const handleChange = (event: SelectChangeEvent) => {
        setOptionSelected(event.target.value as string);
    };

    return (
        <Box sx={{ width: 480 }}>
            <FormControl fullWidth >
            <InputLabel
                id="simple-select-label"
                style={{ backgroundColor: "#DFF8FF" }}
            >
                Estado Alzamiento Hipotecario
            </InputLabel>
            <Select
                size="small"
                sx={{height: '48px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionSelected}
                label="Mensajes por Familia"
                onChange={handleChange}
            >
                {options.map((option, index) => (
                <MenuItem key={`${option.label}-${index}`} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </Box>
    )
};
