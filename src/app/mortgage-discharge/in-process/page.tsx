"use client";

import React, { useCallback, useEffect } from "react";
import { Box, Paper, TablePagination } from "@mui/material";
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
import { ModalTrackingData } from "@/types/mortgage-discharge";

export default function InProcessScreen() {
  const [isOpenTrackingModal, setIsOpenTrackingModal] = React.useState(false);
  const [modalTrackingData, setModalTrackingData] =
    React.useState<ModalTrackingData>();

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = React.useContext(MyContexLayout) as any;

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
      { label: "institutionCode", value: selectedInstitution },
      { label: "count", value: rowsPerPage },
      { label: "offset", value: `${page * rowsPerPage}` },
    ];
    getDataList(auxFilter);
  }, [filters, selectedInstitution, rowsPerPage, page]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlerTrackingModal = (data: ModalTrackingData) => {
    setIsOpenTrackingModal(true);
    setModalTrackingData(data);
  };

  const maxHeight = 470;
  const margin = 32;
  const cardHeight = 88;

  const getHeight = useCallback(() => {
    if (data.length === 0) return maxHeight;
    const espaceByRow = data.length * (cardHeight + margin) + margin;
    if (espaceByRow < maxHeight) return maxHeight - espaceByRow;
    return 0;
  }, [data.length]);

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
        <Box style={{ maxHeight: maxHeight, overflow: "scroll" }}>
          {loading ? (
            <Loader
              label="Cargando Alzamientos Hipotecarios..."
              minHeight={470}
            />
          ) : (
            <>
              {data.map((elemCard: any, i: number) => (
                <CarDischarge
                  key={`key-card-${i}`}
                  data={elemCard}
                  handlerTrackingModal={handlerTrackingModal}
                />
              ))}
              <div
                style={{
                  height: getHeight(),
                }}
              />
            </>
          )}
        </Box>

        <TrackingModal
          open={isOpenTrackingModal}
          onClose={setIsOpenTrackingModal}
          data={modalTrackingData}
        />
        <InfoModal />
        <TablePagination
          rowsPerPageOptions={[5, 7, 10, 25, 50]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ marginRight: 36 }}
          labelRowsPerPage="Registros por página:"
          labelDisplayedRows={({ from, to, count }) => (
            <span>
              Página {from} - {to} de {count}
            </span>
          )}
        />
      </Paper>
    </CardContextProvider>
  );
}
