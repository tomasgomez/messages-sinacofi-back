"use client";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CardContext } from "../../../store/ModalStore";

const options = [
  { label: "Todos", value: "all" },
  { label: "670 - Alzamiento Hipotecario", value: "670" },
  { label: "671 - Aceptación Alzamiento Hipotecario", value: "671" },
  { label: "672 - Rechazo Alzamiento Hipotecario", value: "672" },
  { label: "673 - Aviso de Cliente en Normalización", value: "673" },
  { label: "674 - Solicitud de Liquidación de Prepago ", value: "674" },
  { label: "675 - Liquidación de Prepago", value: "675" },
  { label: "676 - Datos para el Pago de Alzamiento Hipotecario", value: "676" },
  { label: "677 - Aviso de Pago", value: "677" },
  { label: "678 - Rechazo de Pago", value: "678" },
  { label: "679 - Aceptación de Pago", value: "679" },
];

export const MessageTypeDropdown = (props: { widthDropdown: number }) => {
  const { widthDropdown = 300 } = props || {};
  const { handleChangeAddFilter } = useContext(CardContext);

  const [optionSelected, setOptionSelected] = useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event?.target?.value;

    if (value !== null) {
      setOptionSelected(value as string);
      if (value === "all") handleChangeAddFilter("messageType", "");
      else handleChangeAddFilter("messageType", value);
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
                maxWidth: widthDropdown,
                maxHeight: 150, // Ajusta este valor según tus necesidades
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
