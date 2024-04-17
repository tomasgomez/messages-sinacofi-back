"use client";

import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import Header from "./header";
import CarDischarge from "@/app/mortgage-discharge/components/card";
import { dataList } from "./mock";
import { TrackingModal } from "./tracking-modal";
import { InfoModal } from "./info-modal";
import { ModalContextProvider } from "./store/ModalStore";

export default function InProcessScreen() {
  const [isOpenTrackingModal, setIsOpenTrackingModal] = React.useState(false);

  return (
    <ModalContextProvider>
      <Paper sx={{ width: "calc(100% - 270px)" }}>
        <Box sx={{ m: 2 }}>
          <Header title={"Alzamientos Hipotecarios en Proceso"} />
        </Box>
        <Box>
          {dataList.map((data) => (
            <CarDischarge
              data={data}
              handlerTrackingModal={setIsOpenTrackingModal}
            />
          ))}
          <Header title={"Alzamientos Hipotecarios en Proceso"} />
        </Box>
        <TrackingModal
          open={isOpenTrackingModal}
          onClose={setIsOpenTrackingModal}
        />
        <InfoModal />
      </Paper>
    </ModalContextProvider>
  );
}
