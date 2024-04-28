"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CardContext } from "../../../store/ModalStore";

const options = [
  { label: "Todos", value: "all" },
  { label: "670", value: "670" },
  { label: "671", value: "671" },
  { label: "672", value: "672" },
  { label: "673", value: "673" },
  { label: "674", value: "674" },
  { label: "675", value: "675" },
  { label: "676", value: "676" },
  { label: "677", value: "677" },
  { label: "678", value: "678" },
  { label: "679", value: "679" },
];

export const MessageTypeDropdown = (props: { widthDropdown: number }) => {
  const { handleChangeAddFilter } = React.useContext(CardContext);

  const { widthDropdown } = props;
  const [optionSelected, setOptionSelected] = React.useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setOptionSelected(event.target.value as string);
    if (event.target.value === "all") handleChangeAddFilter("messageType", "");
    else handleChangeAddFilter("messageType", event.target.value);
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
          Tipo de Mensaje
        </InputLabel>
        <Select
          size="small"
          sx={{ height: "48px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label="Mensajes por Familia"
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150, // Ajusta este valor según tus necesidades
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
