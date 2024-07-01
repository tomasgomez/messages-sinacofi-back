"use client";
import React, { useContext, useEffect, useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import DataTable from "@/app/component/inbox-table";
import InboxHeaderSearch from "../components/headers/header-search";
import { columnsSearch } from "./columns";
import {
  ScrollableDiv,
  StyledBox,
  StyledPaper,
  StyledTypography,
} from "./styles";
import NoContent from "../components/no-content";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { formatSearchData } from "@/utils/mortgage-discharge-format";
import { MyContexLayout } from "@/app/context";
import { getForeClosureData } from "../api-calls";
import { PaginationAndMortgageDischargeData } from "@/app/component/inbox-table/type";
import { MortgageDischargeContextProvider } from "../components/store/ModalStore";
import { InfoModal } from "../components/info-modal";
import { TrackingModal } from "../components/tracking-modal";

export default function SearchScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [curretFilters, setCurrentFilters] = useState<Filter[]>([]);
  const [amountData, setAmountData] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { ErrorModal } = useModalManager();
  const { selectedInstitution } = useContext(MyContexLayout) as any;

  const handleGetData = async (filters: Filter[], nextPage?: boolean) => {
    try {
      setLoading(true);
      setCurrentFilters(filters);
      const result: PaginationAndMortgageDischargeData =
        await getForeClosureData([
          ...filters,
          { label: "institutionCode", value: selectedInstitution },
          { label: "count", value: rowsPerPage },
          {
            label: "offset",
            value: `${page * rowsPerPage}`,
          },
        ]);
      const formattedData = formatSearchData(result?.data);
      setAmountData(result?.meta.filtered || 0);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setData([]);
      setLoading(false);
      ErrorModal.open(basicError(error));
    }
  };

  useEffect(() => {
    handleGetData(curretFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page]);

  return (
    <MortgageDischargeContextProvider>
      <StyledPaper>
        <ScrollableDiv>
          <InboxHeaderSearch
            title="Búsqueda de Alzamientos Hipotecarios"
            handleGetData={handleGetData}
          />
          <StyledBox>
            <StyledTypography>
              Resultados {data.length ? `(${data.length})` : null}
            </StyledTypography>
            <DataTable
              loading={loading}
              maxHeight={350}
              rows={data}
              columns={columnsSearch}
              emptyDataComponent={NoContent}
              highlightRowDisabled
              amountOfRows={amountData}
              handleChangeRowsPerPageExternally={setRowsPerPage}
              handleChangePageExternally={setPage}
              pageExternally={page}
            />
          </StyledBox>
        </ScrollableDiv>
        <InfoModal />
        <TrackingModal />
      </StyledPaper>
    </MortgageDischargeContextProvider>
  );
}
