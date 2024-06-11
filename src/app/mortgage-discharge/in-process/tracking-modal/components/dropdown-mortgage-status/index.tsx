"use client";

import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React, { useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const MortgageStatusDropdown = (props: {
  options: any[];
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
}) => {
  const {
    onChange = () => null,
    value = "021",
    options = [],
    disabled = false,
  } = props || {};

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  useEffect(() => {
    onChange(options.find((option) => !option?.disabled)?.value);
  }, [options]);
  
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
          defaultValue={
            options.find((option) => !option?.disabled)?.value || "021"
          }
          disabled={disabled || !options.find((option) => !option?.disabled)}
          label="Mensajes por Familia"
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            PaperProps: {
              style: {
                maxWidth: 480, // Ajusta este valor según tus necesidades
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={`${option.label}-${index}`}
              value={option.value}
              disabled={option?.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
