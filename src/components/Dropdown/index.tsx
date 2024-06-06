import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material";
import Loader from "../Loader";

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input.Mui-disabled": {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  "& .MuiFormLabel-root": {
    color: "#565656 !important",
    backgroundColor: "#DFF8FF"
  },
});


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
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  error?: any;
}) {
  const {
    width,
    label,
    options,
    defaultValue = "",
    selected,
    disabled,
    onChange,
    valueKey = "value",
    labelKey = "label",
    placeholder,
    loading,
    error,
    loadingMessage = "Cargando...",
  } = props;
  const [optionSelected, setOptionSelected] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setOptionSelected(selected || defaultValue);
  }, [defaultValue, selected]);

  const handleChange = (event: any) => {
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
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label={label}
          placeholder={placeholder}
          onChange={handleChange}
          error={error}
          onFocus={handleFocus}
          disabled={disabled}
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
        </StyledSelect>
      </FormControl>
    </Box>
  );
}
