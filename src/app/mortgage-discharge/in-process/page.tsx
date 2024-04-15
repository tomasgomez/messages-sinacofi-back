"use client";
import React from "react";
import { Box, Paper } from "@mui/material";
import Header from "./header";
import CarDischarge from "@/app/mortgage-discharge/components/card";
import { dataList } from "./mock";

export default function InProcessScreen() {
  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <Header title={"Alzamientos Hipotecarios en Proceso"} />
      </Box>
      <Box>
        {dataList.map((data) => (
          <CarDischarge data={data} />
        ))}
      </Box>
    </Paper>
  );
}
