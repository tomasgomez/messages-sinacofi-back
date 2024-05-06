"use client";

import React, { useContext, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Header from "./header";
import CarDischarge from "@/app/mortgage-discharge/components/card";
import { TrackingModal } from "./tracking-modal";
import { InfoModal } from "./info-modal";
import { CardContextProvider } from "./store/ModalStore";
import { getForeClosureDataCards } from "../api-calls";
import Loader from "@/components/Loader";
import { formatCardData } from "@/utils/mortgage-discharge";
import { IsEmptyObject } from "@/utils/functions";
import { MyContexLayout } from "@/app/context";

export default function InProcessScreen() {
  const [isOpenTrackingModal, setIsOpenTrackingModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>([]);

  // Change after add users "selectedInsitution"
  const { selectedInsitution } = React.useContext(MyContexLayout) as any;

  const [filters, setFilters] = React.useState<any[]>([
    { label: "channel", value: "Personas" },
  ]);

  const getDataList = async (filters?: any) => {
    setLoading(true);
    const result = await getForeClosureDataCards(filters);
    if (!IsEmptyObject(result)) {
      const dataFormated = formatCardData(result);
      setData(dataFormated);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Add the institution destination to the filters after changing it
    const auxFilter = [
      ...filters,
      // institutionDestination is a code so not need the funtion intitutionCodeToLabel
      { label: "institutionDestination", value: selectedInsitution },
      { label: "institutionOrigin", value: selectedInsitution },
    ];
    getDataList(auxFilter);
  }, [filters, selectedInsitution]);

  return (
    <CardContextProvider filters={filters} setFilters={setFilters}>
      <Paper sx={{ width: "calc(100% - 270px)" }}>
        <Box sx={{ m: 2 }}>
          <Header
            dataCodeList={
              data?.map((elem: any) => elem?.codeData?.cukCode) || []
            }
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
