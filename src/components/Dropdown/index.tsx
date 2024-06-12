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
    backgroundColor: "#DFF8FF",
  },
});

export default function Dropdown(props: {
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
  maxMenuHeight?: number | string;
  maxMenuWidth?: number | string;
  disablePortal?: boolean;
  disableScrollLock?: boolean;
}) {
  const {
    width = "100%",
    label,
    options = [],
    defaultValue = "",
    selected,
    disabled = false,
    onChange = () => null,
    valueKey = "value",
    labelKey = "label",
    placeholder,
    loading = false,
    maxMenuHeight,
    maxMenuWidth,
    error,
    disablePortal = true,
    disableScrollLock = true,
  } = props;

  const [optionSelected, setOptionSelected] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    document.documentElement.style.overflow = "";
  };

  // handle click to fix the problem of the menu with the scrollbar
  const handleClick = () => {
    isMenuOpen
      ? (document.documentElement.style.overflow = "")
      : (document.documentElement.style.overflow = "hidden");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <InputLabel
          id="dropdown-select-label"
          style={{
            backgroundColor:
              isFocused || !!optionSelected ? "#DFF8FF" : "transparent",
          }}
        >
          {label}
        </InputLabel>
        <StyledSelect
          labelId="dopdown-select-basic"
          id="dopdown-select-basic-id"
          value={optionSelected}
          label={label}
          placeholder={placeholder}
          onChange={handleChange}
          error={error}
          onFocus={handleFocus}
          disabled={disabled}
          onBlur={handleBlur}
          onClick={handleClick}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: maxMenuHeight,
                maxWidth: maxMenuWidth,
              },
            },
            // Necessary to fix the problem with the scrollbar
            disablePortal: disablePortal,
            disableScrollLock: disableScrollLock,
          }}
        >
          {loading ? (
            <Loader />
          ) : (
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
