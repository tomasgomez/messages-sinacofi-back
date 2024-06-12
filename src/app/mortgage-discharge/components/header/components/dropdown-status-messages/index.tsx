"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CardContext } from "../../../../components/store/ModalStore";

const options = [
  { label: "Todos", value: "all" },
  { label: "Pendiente de Envio", value: "01" },
  { label: "Pendiente de Firma", value: "01" },
  { label: "Operaciones Enviadas", value: "05" },
  { label: "Operaciones Recibidas", value: "06" },
];

export const MessageStatusDropdown = (props: { widthDropdown: number }) => {
  const { handleChangeAddFilter } = React.useContext(CardContext);

  const { widthDropdown = 300 } = props || {};
  const [optionSelected, setOptionSelected] = React.useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event?.target?.value;

    if (value !== null) {
      setOptionSelected(value as string);
      if (value === "all") handleChangeAddFilter("status", "");
      else handleChangeAddFilter("status", value);
    }
  };

  return (
    <Box sx={{ width: widthDropdown }}>
      <FormControl fullWidth>
        <InputLabel
          id="simple-select-label"
          style={{
            backgroundColor: "#DFF8FF",
            width: "142px",
            textAlign: "center",
            paddingLeft: "4px",
          }}
        >
          Estado de Mensaje
        </InputLabel>
        <Select
          size="small"
          sx={{ height: "48px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label="Estado de Mensaje"
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150,
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
