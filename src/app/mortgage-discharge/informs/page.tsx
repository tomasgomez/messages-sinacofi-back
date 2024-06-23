"use client";
import React, { useEffect, useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import { StyledPaper, StyledBox, StyledTableTitle } from "./styles";
import NoContent from "../components/no-content";
import DataTable from "@/app/component/inbox-table";
import HeaderInforms from "@/app/mortgage-discharge/components/headers/header-informs";
import { columnsInformsAccepted, columnsInformsRejected } from "./columns";
import { Button, Tab, Tabs } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { getInformsAccepted, getInformsRejected } from "@/app/services/common";

export default function SearchScreen() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>(columnsInformsRejected);

  const { ErrorModal } = useModalManager();

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    handleGetData(newValue);
    setSelectedTab(newValue);
  };

  const handleGetData = async (tab: number) => {
    try {
      setLoading(true);
      // console.log("filters: ", filters);
      setColumns(tab ? columnsInformsRejected : columnsInformsAccepted);
      const rowsData = tab
        ? await getInformsRejected(filters)
        : await getInformsAccepted(filters);
      setData(rowsData);
      setLoading(false);
    } catch (error: any) {
      setData([]);
      setLoading(false);
      ErrorModal.open(basicError(error));
    }
  };

  useEffect(() => {
    handleGetData(selectedTab);
  }, [filters]);

  const TableTitle = ({
    selectedTab,
    handleChange,
  }: {
    selectedTab: number;
    handleChange: any;
  }) => {
    return (
      <StyledTableTitle>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{
            paddingLeft: "12px",
          }}
        >
          <Tab
            label="Plazos"
            id={`plazos-tab-${0}`}
            aria-controls={`plazos-tabpanel-${0}`}
          />
          <Tab
            label="Rechazos"
            id={`rechazos-tab-${1}`}
            aria-controls={`rechazos-tabpanel-${1}`}
          />
        </Tabs>
        <Button
          variant="contained"
          sx={{ color: "#FFF", width: "190px", margin: "16px 20px" }}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          Descargar Reporte
        </Button>
      </StyledTableTitle>
    );
  };

  return (
    <StyledPaper>
      <HeaderInforms
        title="Informes AH"
        filters={filters}
        setFilters={setFilters}
      />
      <StyledBox>
      <DataTable
          loading={loading}
          maxHeight={480}
          rows={data}
          columns={columns}
          tableTitle={
            <TableTitle selectedTab={selectedTab} handleChange={handleChange} />
          }
          emptyDataComponent={NoContent}
          defaultRowsPerPage={7}
          highlightRowDisabled
          rowHeight={57}
          loadingColums
        />
      </StyledBox>
    </StyledPaper>
  );
}
