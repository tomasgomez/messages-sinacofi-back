"use client";
import React, { useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import DataTable from "@/app/component/inbox-table";
import InboxHeaderSearch from "../components/header-search";
import { columnsSearch } from "./columns";
import {
  ScrollableDiv,
  StyledBox,
  StyledPaper,
  StyledTypography,
} from "./styles";

export default function SearchScreen() {
  const [filters, setFilters] = useState<Filter[]>([]);

  return (
    <StyledPaper>
      <ScrollableDiv>
        <InboxHeaderSearch
          title="Búsqueda de Alzamientos Hipotecarios"
          filters={filters}
          setFilters={setFilters}
        />
        <StyledBox>
          <StyledTypography>Resultados</StyledTypography>
          <DataTable
            maxHeight={350}
            rows={[]}
            columns={columnsSearch}
            withCheckbox={false}
          />
        </StyledBox>
      </ScrollableDiv>
    </StyledPaper>
  );
}
