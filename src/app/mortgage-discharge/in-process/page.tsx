"use client"

import React from "react";

import { Box, Paper } from "@mui/material";

import Header from "./header";

export default function InProcessScreen() {
  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}> 
        <Header title={'Alzamientos Hipotecarios en Proceso'} />
      </Box>
    </Paper>
  );
};
