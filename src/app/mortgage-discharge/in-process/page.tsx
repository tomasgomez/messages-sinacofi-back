"use client";
import React from "react";
import MortgageDischargeScreen from "../components/screen";

export default function InProcessScreen() {
  return (
    <MortgageDischargeScreen 
      extraFilter={[{
        label: 'statusCategory', 
        value:'in_progress'
      }]} 
      title="Alzamientos Hipotecarios en Proceso" 
    />
  );
}
