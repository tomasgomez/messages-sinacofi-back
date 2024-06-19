"use client";
import * as React from "react";
import Field from "@/components/Field";

export const TextInputFilters = (props: {
  label: string;
  keyLabel: string;
  handleChange: Function;
  value: string;
  width?: number | string;
  placeholder?: string;
  sx?: any;
}) => {
  const {
    label,
    keyLabel,
    handleChange,
    value,
    sx,
    placeholder = "",
    width,
  } = props;
  return (
    <Field
      width={width}
      sx={{ ...sx }}
      label={label}
      value={value}
      placeholder={placeholder}
      defaultValue={""}
      onChange={(value: any) => {
        handleChange(keyLabel, value);
      }}
      InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
    />
  );
};
