"use client";

import React, { useState, useContext, useCallback, useEffect } from "react";
import { Box, Paper, TablePagination } from "@mui/material";
import Header from "./header";
import CarDischarge from "@/app/mortgage-discharge/components/card";
import { TrackingModal } from "./tracking-modal";
import { InfoModal } from "./info-modal";
import { CardContextProvider } from "./store/ModalStore";
import { getForeClosureDataCards } from "../api-calls";
import Loader from "@/components/Loader";
import { formatCardData } from "@/utils/mortgage-discharge-format";
import { MyContexLayout } from "@/app/context";
import {
  DataMortgageDischarge,
  Filter,
  ModalTrackingData,
} from "@/types/mortgage-discharge";
import { MortgageDischargeData } from "@/app/component/inbox-table/type";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";
import EmptyScreen from "../components/empty-screen";
import { useCalcDimensions } from "@/utils/dimensions";

export default function InProcessScreen() {
  const [isOpenTrackingModal, setIsOpenTrackingModal] = useState(false);
  const [modalTrackingData, setModalTrackingData] =
    useState<ModalTrackingData>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataMortgageDischarge[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;

  const { ErrorModal } = useModalManager();

  const [filters, setFilters] = useState<Filter[]>([
    { label: "channel", value: "Personas" },
  ]);

  const handleGetDataList = async () => {
    try {
      setLoading(true);

      // Add the institution destination to the filters after changing it
      const auxFilters: Filter[] = [
        ...filters,
        { label: "institutionCode", value: selectedInstitution },
        { label: "count", value: rowsPerPage },
        { label: "offset", value: `${page * rowsPerPage}` },
      ];

      const result: MortgageDischargeData[] = await getForeClosureDataCards(
        auxFilters
      );

      setData(formatCardData(result));
      setLoading(false);
    } catch (error: any) {
      setData([]);
      setLoading(false);
      ErrorModal.open(basicError(error));
    }
  };

  useEffect(() => {
    handleGetDataList();
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

  const handlerTrackingModal = (data?: ModalTrackingData) => {
    setIsOpenTrackingModal(true);
    setModalTrackingData(data);
  };

  const usedHeight: number = 300;
  const { height: maxHeight }: { height: number } =
    useCalcDimensions(usedHeight);
  const margin: number = 20;
  const cardHeight: number = 88.95;

  const getHeight = useCallback(() => {
    if (!data || !data.length) return maxHeight;
    const espaceByRow = data.length * (cardHeight + margin);
    if (espaceByRow < maxHeight) return maxHeight - espaceByRow;
    return 0;
  }, [data?.length, maxHeight]);

  return (
    <CardContextProvider filters={filters} setFilters={setFilters}>
      <Paper
        sx={{
          width: "calc(100% - 270px)",
        }}
      >
        <Box sx={{ m: 2 }}>
          <Header
            dataCodeList={data?.map(
              (elem: DataMortgageDischarge) => elem?.codeData?.cukCode
            )}
            title={"Alzamientos Hipotecarios en Proceso"}
          />
        </Box>
        <Box
          style={{
            maxHeight:
              maxHeight < 0 ? `calc(100vh - ${usedHeight}px)` : maxHeight,
            overflowY: "scroll",
            overflowX: "hidden",
            width: "calc(100vw - 270px)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {loading ? (
            <Loader
              label="Cargando Alzamientos Hipotecarios..."
              minHeight={
                maxHeight < 0 ? `calc(100vh - ${usedHeight}px)` : maxHeight
              }
            />
          ) : (
            <>
              {data?.map((elemCard: any, i: number) => (
                <CarDischarge
                  key={`key-card-${i}`}
                  data={elemCard}
                  handlerTrackingModal={handlerTrackingModal}
                />
              ))}
              {!data || !data.length ? (
                <EmptyScreen height={maxHeight} />
              ) : (
                <div
                  style={{
                    height: getHeight(),
                  }}
                />
              )}
            </>
          )}
        </Box>

        {isOpenTrackingModal && (
          <TrackingModal
            open={isOpenTrackingModal}
            onClose={setIsOpenTrackingModal}
            data={modalTrackingData}
            handleGetDataList={handleGetDataList}
            setLoading={setLoading}
            selectedInstitution={selectedInstitution}
          />
        )}
        <InfoModal />
        <TablePagination
          rowsPerPageOptions={[5, 7, 10, 25, 50]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            marginTop: 16,
            marginRight: 16,
          }}
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
