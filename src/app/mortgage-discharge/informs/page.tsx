"use client";
import React, { useEffect, useState } from "react";
import { Filter } from "@/types/mortgage-discharge";
import { StyledPaper, StyledBox, StyledTableTitle } from "./styles";
import NoContent from "../components/no-content";
import DataTable from "@/app/component/inbox-table";
import HeaderInforms from "@/app/mortgage-discharge/components/headers/header-informs";
import { columnsInforms } from "./columns";
import { Button, Tab, Tabs } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";

export default function SearchScreen() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { ErrorModal } = useModalManager();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleGetData = async () => {
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

  useEffect(() => {
    handleGetData();
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
          maxHeight={350}
          rows={data}
          columns={columnsInforms}
          tableTitle={
            <TableTitle selectedTab={selectedTab} handleChange={handleChange} />
          }
          emptyDataComponent={NoContent}
          defaultRowsPerPage={10}
        />
      </StyledBox>
    </StyledPaper>
  );
}
