"use client";
import * as React from "react";

import Field from "@/components/Field";

export const RutInput = (props: {
  label: string;
  keyLabel: string;
  handleChange: Function;
  value: string;
}) => {
  const { label, keyLabel, handleChange, value } = props;
  return (
    <Field
      InputProps={{ sx: { height: "48px" } }}
      label={label}
      value={value}
      placeholder="Ingrese RUT..."
      onChange={(value: any) => {
        handleChange(keyLabel, value);
      }}
      InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
    />
  );
};
