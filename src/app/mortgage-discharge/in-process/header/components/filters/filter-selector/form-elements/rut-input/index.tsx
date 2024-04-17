"use client";
import * as React from "react";

import Field from "@/components/Field";

export const RutInput = (props: {label: string; }) => {
    return (
        <Field
            InputProps={{sx: {height: '48px'}}}
            label={props.label}
            value=""
            placeholder="Ingrese RUT..."
            defaultValue={''}
            onChange={(value: any) => {
                console.log({ value });
            }}
            InputLabelProps={{ shrink: true, style: {background: '#DFF8FF'} }} 
        />
    );
};
