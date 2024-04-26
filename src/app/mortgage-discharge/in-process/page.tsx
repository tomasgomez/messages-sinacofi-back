"use client";

import React, { useContext, useEffect } from "react";
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
  // TODO: Recall the data with filter after filter something
  const [filters, setFilters] = React.useState<any[]>([]);

  const getDataList = async (filters?: any) => {
    setLoading(true);
    const result = await getForeClosureDataCards(filters);
    const dataFormated = formatData(result);
    setData(dataFormated);
    setLoading(false);
  };

  useEffect(() => {
    getDataList(filters);
  }, []);

  // TODO: Descomentar cuando se implemente el filtro en backend
  useEffect(() => {
    if (filters) {
      getDataList(filters);
    }
  }, [filters]);

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
