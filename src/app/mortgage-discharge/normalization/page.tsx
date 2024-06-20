"use client";
import React from "react";
import MortgageDischargeScreen from "../components/screen";

export default function NormalizationScreen() {
  return (
    <MortgageDischargeScreen
      extraFilter={[{
        label: 'statusCategory', 
        value:'normalization'
      }]} 
      title="Alzamientos Hipotecarios con Clientes Normalizacion" 
    />
  );
}
