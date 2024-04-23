"use client";

import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Header from "./header";
import CarDischarge from "@/app/mortgage-discharge/components/card";
// import { dataList } from "./mock";
import { TrackingModal } from "./tracking-modal";
import { InfoModal } from "./info-modal";
import { CardContextProvider } from "./store/ModalStore";
import { getForeClosureDataCards } from "../api-calls";
import Loader from "@/components/Loader";
import { formatData } from "@/utils/mortgage-discharge";

export default function InProcessScreen() {
  const [isOpenTrackingModal, setIsOpenTrackingModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  const getDataList = async () => {
    setLoading(true);
    const result: { messages: any[] } = await getForeClosureDataCards();
    const dataFormated = formatData(result);
    setData(dataFormated);
    setLoading(false);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <CardContextProvider>
      <Paper sx={{ width: "calc(100% - 270px)" }}>
        <Box sx={{ m: 2 }}>
          <Header
            dataCodeList={data?.map((elem: any) => elem.CUK) || []}
            title={"Alzamientos Hipotecarios en Proceso"}
          />
        </Box>
        <Box style={{ maxHeight: 510, overflow: "scroll" }}>
          {loading ? (
            <Loader label="Cargando Alzamientos Hipotecarios..." />
          ) : (
            data.map((elemCard: any, i: number) => (
              <CarDischarge
                key={`key-card-${i}`}
                data={elemCard}
                handlerTrackingModal={setIsOpenTrackingModal}
              />
            ))
          )}
        </Box>
        <TrackingModal
          open={isOpenTrackingModal}
          onClose={setIsOpenTrackingModal}
        />
        <InfoModal />
      </Paper>
    </CardContextProvider>
  );
}
