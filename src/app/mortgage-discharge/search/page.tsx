"use client";
import React, { useState } from "react";
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

export default function SearchScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { ErrorModal } = useModalManager();

  // const data: unknown[] = [
  //   // { NSR: "123", id: "9792ae71-24c2-4d15-8c9b-15c9b87f74ca" },
  // ];

  const handleGetData = async (filters: Filter[]) => {
    try {
      setLoading(true);
      console.log("filters: ", filters);
      // TODO: add api call
      setLoading(false);
    } catch (error: any) {
      setData([]);
      setLoading(false);
      ErrorModal.open(basicError(error));
    }
  };
  return (
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
          />
        </StyledBox>
      </ScrollableDiv>
    </StyledPaper>
  );
}
