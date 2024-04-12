"use client";

import * as React from "react";

import Field from "@/components/Field";

export const InputCode = (props: { title: string; }) => {

  return (
    <Field
        InputProps={{sx: {height: '48px'}}}
        value={''}
        label={props.title}
        placeholder="Ingrese Código..."
        defaultValue={''}
        onChange={(value: any) => {
            console.log({ value });
        }}
        InputLabelProps={{ shrink: true, style: {background: '#DFF8FF'} }} 
        {...props}
    />
  );
};
