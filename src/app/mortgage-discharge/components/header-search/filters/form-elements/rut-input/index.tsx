"use client";
import * as React from "react";

import Field from "@/components/Field";

export const RutInput = (props: {
  label: string;
  keyLabel: string;
  handleChange: Function;
  value: string;
  sx?: any;
}) => {
  const { label, keyLabel, handleChange, value, sx } = props;
  return (
    <Field
      sx={{ ...sx }}
      label={label}
      value={value}
      placeholder="Ingrese RUT..."
      defaultValue={""}
      onChange={(value: any) => {
        handleChange(keyLabel, value);
      }}
      InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
    />
  );
};
