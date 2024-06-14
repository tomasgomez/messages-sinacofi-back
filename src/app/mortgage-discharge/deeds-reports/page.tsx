"use client";
import React, { useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import DataTable from "@/app/component/inbox-table";
import InboxHeaderSearch from "../components/header-search";
import { columnsDeedsReports } from "./columns";
import {
  ScrollableDiv,
  StyledBox,
  StyledPaper,
  StyledTypography,
} from "./styles";
import NoContent from "../components/no-content";

export default function SearchScreen() {
  const [filters, setFilters] = useState<Filter[]>([]);

  const data: unknown[] = [];
  const amountRows: number = data.length;

  return (
    <StyledPaper>
      <ScrollableDiv>
        <InboxHeaderSearch
          title="Escrituras y Reparos"
          filters={filters}
          setFilters={setFilters}
        />
        <StyledBox>
          <StyledTypography>
            Resultados {amountRows ? `(${amountRows})` : null}
          </StyledTypography>
          <DataTable
            maxHeight={350}
            rows={data}
            columns={columnsDeedsReports}
            emptyDataComponent={NoContent}
          />
        </StyledBox>
      </ScrollableDiv>
    </StyledPaper>
  );
}
