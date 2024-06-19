"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const FilterDropdowns = (props: {
  handleChange: Function;
  title: string;
  keyLabel: string;
  options: any[];
  optionSelected: string;
  sx?: any;
}) => {
  const { handleChange, title, options, keyLabel, optionSelected, sx } = props;

  const handleChangeComplete = (event: SelectChangeEvent) => {
    handleChange(keyLabel, event.target.value);
  };

  return (
    <Box sx={{ ...sx }}>
      <FormControl fullWidth>
        <InputLabel
          id="destiny-select-label"
          style={{
            backgroundColor: "#DFF8FF",
          }}
        >
          {title}
        </InputLabel>
        <Select
          size="small"
          sx={{ height: "56px" }}
          labelId="destiny-select-label"
          id="destiny-select"
          value={optionSelected}
          onChange={handleChangeComplete}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150,
                maxWidth: 262,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={`${option.label}-${index}`} value={option.value}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {option.label}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
