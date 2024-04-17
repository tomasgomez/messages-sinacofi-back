"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


export const RegionDropdown = () => {

    const options = [
        { label: "Todos", value: "todos" },
        { label: "Alzamiento Hipotecario", value: "alzamiento" },
        { label: "Camara de Compensacion ATM", value: "camara" },
    ];
    const [optionSelected, setOptionSelected] = React.useState(options[0].value);
   

    const handleChange = (event: SelectChangeEvent) => {
        setOptionSelected(event.target.value as string);
    };

    return (
        <Box sx={{ width: '262px' }}>
            <FormControl fullWidth >
            <InputLabel
                id="destiny-select-label"
                style={{ backgroundColor: "#DFF8FF"}}
            >
                Region
            </InputLabel>
            <Select
                size="small"
                sx={{height: '48px'}}
                labelId="destiny-select-label"
                id="destiny-select"
                value={optionSelected}
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
    );
}
