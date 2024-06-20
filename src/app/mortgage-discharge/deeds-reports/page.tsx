"use client";
import React, { useContext, useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import DataTable from "@/app/component/inbox-table";
import InboxHeaderSearch from "../components/headers/header-search";
import { columnsDeedsReports } from "./columns";
import {
  ScrollableDiv,
  StyledBox,
  StyledPaper,
  StyledTypography,
} from "./styles";
import NoContent from "../components/no-content";
import { MortgageDischargeData } from "@/app/component/inbox-table/type";
import { getForeClosureData } from "../api-calls";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { useModalManager } from "@/components/Modal";
import { MyContexLayout } from "@/app/context";
import { formatDeedsReportsData } from "@/utils/mortgage-discharge-format";

export default function SearchScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { ErrorModal } = useModalManager();

  const { selectedInstitution } = useContext(MyContexLayout) as any;

  const handleGetData = async (filters: Filter[]) => {
    try {
      setLoading(true);
      const result: MortgageDischargeData[] = await getForeClosureData([
        ...filters,
        { label: "institutionCode", value: selectedInstitution },
        { label: "count", value: 100 },
      ]);
      const formattedData = formatDeedsReportsData(result);
      setData(formattedData);
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
          title="Escrituras y Reparos"
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
            columns={columnsDeedsReports}
            emptyDataComponent={NoContent}
          />
        </StyledBox>
      </ScrollableDiv>
    </StyledPaper>
  );
}
