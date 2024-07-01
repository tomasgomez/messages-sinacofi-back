"use client";

import React, { useState, useContext, useCallback, useEffect } from "react";
import { Box, Paper, TablePagination } from "@mui/material";
import Header from "@/app/mortgage-discharge/components/headers/header-screen-cards";
import CarDischarge from "@/app/mortgage-discharge/components/card";
import { TrackingModal } from "../tracking-modal";
import { InfoModal } from "../info-modal";
import { MortgageDischargeContextProvider } from "../store/ModalStore";
import { getForeClosureData } from "../../api-calls";
import Loader from "@/components/Loader";
import { formatCardData } from "@/utils/mortgage-discharge-format";
import { MyContexLayout } from "@/app/context";
import { DataMortgageDischarge, Filter } from "@/types/mortgage-discharge";
import { PaginationAndMortgageDischargeData } from "@/app/component/inbox-table/type";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { useCalcDimensions } from "@/utils/dimensions";
import NoSearchResult from "../empty-screens/no-search-results";
import {
  NoMortgageDischargeInProgress,
  NoMortgageDischargeCompleted,
  NoMortgageDischargeNormalization,
} from "../empty-screens/no-mortgage-discharge";

export default function MortgageDischargeScreen({
  title = "",
  extraFilter = [],
  isNormalizationScreen = false,
}: {
  title: string;
  extraFilter?: any[];
  isNormalizationScreen?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataMortgageDischarge[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [amountCards, setAmountCards] = useState(0);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = useContext(MyContexLayout) as any;

  const { ErrorModal } = useModalManager();

  const [filters, setFilters] = useState<Filter[]>([
    { label: "channel", value: "Personas" },
  ]);

  const handlePaginations = (meta: any) => {
    setAmountCards(meta?.filtered);
  };

  const handleGetDataList = async () => {
    try {
      setLoading(true);
      // Add the institution destination to the filters after changing it
      const auxFilters: Filter[] = [
        ...filters,
        ...extraFilter,
        { label: "institutionCode", value: selectedInstitution },
        { label: "count", value: rowsPerPage },
        { label: "offset", value: `${page * rowsPerPage}` },
      ];

      const result: PaginationAndMortgageDischargeData =
        await getForeClosureData(auxFilters);
        
      setData(formatCardData(result?.data || []));
      handlePaginations(result?.meta || {});
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

  const usedHeight: number = 316;
  const { height: maxHeight }: { height: number } =
    useCalcDimensions(usedHeight);
  const margin: number = 20;
  const cardHeight: number = 92.95;

  const getHeight = useCallback(() => {
    if (!data || !data.length) return maxHeight;
    const espaceByRow = data.length * (cardHeight + margin);
    if (espaceByRow < maxHeight) return maxHeight - espaceByRow;
    return 0;
  }, [data?.length, maxHeight]);

  function hasNonChannelFilter(): boolean {
    return filters.some((filter) => filter.label !== "channel");
  }

  const getNoDataComponent = () => {
    const statusCategory = extraFilter.find(
      (filter) => filter.label === "statusCategory"
    );
    if (statusCategory?.value === "in_progress") {
      return <NoMortgageDischargeInProgress height={maxHeight} />;
    }
    if (statusCategory?.value === "completed") {
      return <NoMortgageDischargeCompleted height={maxHeight} />;
    }
    if (statusCategory?.value === "normalization") {
      return <NoMortgageDischargeNormalization height={maxHeight} />;
    }
  };

  return (
    <MortgageDischargeContextProvider filters={filters} setFilters={setFilters}>
      <Paper sx={{ width: "100%", height: "100%" }}>
        <Box sx={{ padding: "16px 16px 6px 16px" }}>
          <Header
            dataCodeList={data?.map(
              (elem: DataMortgageDischarge) => elem?.codeData?.cukCode
            )}
            title={title}
          />
        </Box>
        <Box
          style={{
            maxHeight:
              maxHeight < 0 ? `calc(100vh - ${usedHeight}px)` : maxHeight,
            overflowY: "auto",
            overflowX: "hidden",
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
                  isNormalizationScreen={isNormalizationScreen}
                />
              ))}
              {!data || !data.length ? (
                hasNonChannelFilter() ? (
                  <NoSearchResult height={maxHeight} />
                ) : (
                  getNoDataComponent()
                )
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
        <TrackingModal handleGetDataList={handleGetDataList} />
        <InfoModal />
        <TablePagination
          rowsPerPageOptions={[5, 7, 10, 25, 50]}
          component="div"
          count={amountCards}
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
    </MortgageDischargeContextProvider>
  );
}
