import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { CircularProgress, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import Loader from "../Loader";

export default function Dropdrown(props: {
  label: string;
  width?: number | string;
  options: any;
  defaultValue?: any;
  selected?: any;
  placeholder?: string;
  onChange?: any;
  valueKey?: string;
  labelKey?: string;
  loading?: boolean;
  loadingMessage?: string;
}) {
  const {
    width,
    label,
    options,
    defaultValue = "",
    selected,
    onChange,
    valueKey = "value",
    labelKey = "label",
    placeholder,
    loading,
    loadingMessage = "Cargando...",
  } = props;
  const [optionSelected, setOptionSelected] = React.useState(defaultValue);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    setOptionSelected(selected);
  }, [selected]);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
    setOptionSelected(event.target.value as string);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <InputLabel
          id="simple-select-label"
          style={{
            backgroundColor:
              isFocused || !!optionSelected ? "#DFF8FF" : "transparent",
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label={label}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          // displayEmpty
          onBlur={handleBlur}
        >
          {loading ? (
            <Loader />
          ) : (
            // <MenuItem disabled value="">
            //   {placeholder}
            //   {/* <em>Placeholder</em> */}
            // </MenuItem>
            options.map((option: any, index: number) => (
              <MenuItem
                key={`${option[labelKey]}-${index}`}
                value={option[valueKey]}
              >
                {option[labelKey]}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
