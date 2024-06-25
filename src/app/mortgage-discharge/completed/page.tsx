"use client";
import React from "react";
import MortgageDischargeScreen from "../components/screen";

export default function CompletedScreen() {
  return (
    <MortgageDischargeScreen 
      extraFilter={[{
        label: 'statusCategory', 
        value:'completed'
      }]} 
      title="Alzamientos Hipotecarios Completados"
    />
  );
}
