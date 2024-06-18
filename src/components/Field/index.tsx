"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { TextField, TextFieldProps, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  "& .MuiFormLabel-root": {
    color: "#565656 !important",
  },
});

export default function Field(
  props: {
    value?: any;
    label: string;
    width?: number | string;
    options?: any;
    onChange?: any;
  } & TextFieldProps
) {
  const { width, label, value, defaultValue, onChange } = props;
  const [isFocused, setIsFocused] = React.useState(false);

  const handleChange = React.useCallback(
    (evt: any) => {
      onChange && onChange(evt.target?.value, evt);
    },
    [onChange]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        width,
        color: "#000000",
        "& #outlined-basic-label": {
          backgroundColor:
            isFocused || value || defaultValue ? "#DFF8FF" : "transparent",
        },
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <FormControl fullWidth>
        <StyledTextField
          id="outlined-basic"
          variant="outlined"
          {...props}
          defaultValue={defaultValue}
          label={label}
          value={value || defaultValue}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}
