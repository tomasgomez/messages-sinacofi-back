"use client";

import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const MortgageStatusDropdown = (props: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const { onChange, value } = props;

  const options = [
    {
      label: "021 - Evaluación Alzamiento Hipotecario En Proceso",
      value: "021",
    },
    { label: "022 - Evaluación Alzamiento Hipotecario Aceptada", value: "022" },
    {
      label: "023 - Evaluación Alzamiento Hipotecario Rechazada",
      value: "023",
    },
    { label: "XXX - Inicio de Cliente en Normalización", value: "XXX" },
    { label: "YYY - Fin de Cliente en Normalización", value: "YYY" },
    { label: "041 - Firma de Escritura en Proceso", value: "041" },
    { label: "042 - Escritura Firmada", value: "042" },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ width: 480 }}>
      <FormControl fullWidth>
        <InputLabel
          id="simple-select-label"
          style={{ backgroundColor: "#DFF8FF" }}
        >
          Estado Alzamiento Hipotecario
        </InputLabel>
        <Select
          size="small"
          sx={{ height: "48px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          defaultValue={"021"}
          label="Mensajes por Familia"
          onChange={handleChange}
          MenuProps={{
            // anchorOrigin: {
            //   vertical: "bottom",
            //   horizontal: "center",
            // },
            PaperProps: {
              style: {
                maxHeight: 100,
                maxWidth: 480, // Ajusta este valor según tus necesidades
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={`${option.label}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
