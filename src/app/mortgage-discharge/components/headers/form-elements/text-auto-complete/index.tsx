"use client";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Field from "@/components/Field";

export const TextAutoComplete = (props: {
  label: string;
  keyLabel: string;
  handleChange: Function;
  value: string;
  options: string[];
  width?: number | string;
  placeholder?: string;
  sx?: any;
}) => {
  const {
    options = [],
    label,
    keyLabel,
    handleChange,
    value,
    sx,
    placeholder = "",
    width,
  } = props || {};

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={(event: any, newValue: string | null) => {
        handleChange(keyLabel, newValue);
      }}
      clearOnBlur={false}
      clearOnEscape={false}
      options={options}
      style={{ width: width }}
      renderInput={(params) => (
        <Field
          width={width}
          sx={{ ...sx }}
          label={label}
          placeholder={placeholder}
          defaultValue={""}
          //   onChange={(value: any) => {
          //     handleChange(keyLabel, value);
          //   }}
          InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
        />
      )}
    />
  );
};
