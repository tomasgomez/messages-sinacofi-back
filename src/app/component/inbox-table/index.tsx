"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { TableHeader } from "./components/table-header-inbox";
import TableContentRows from "./components/table-rows-inbox";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { StyledTabCell } from "./style";
import {
  Columns,
  Message,
  KeyOfData,
  Order,
  SentData,
  RowOptions,
} from "./type";
import { getComparator, stableSort } from "./utils";

import { TableContentLoader } from "./components/table-content-loader";
import { MessageExportContext } from "../MessageExportProvider";
import { TableContentNoDataBasic } from "./components/table-content-no-data-basic";

export default function EnhancedTable(props: {
  tableTitle?: React.ReactNode;
  rows: Message[] | SentData[] | any[];
  columns: Columns[];
  loading?: boolean;
  withCheckbox?: boolean;
  withRadioButton?: boolean | Function;
  maxHeight?: number | string;
  defaultOrderBy?: keyof Message;
  defaultOrder?: Order;
  highlightLastRow?: boolean;
  highlightRowDisabled?: boolean;
  isExpansible?: boolean;
  endDetailsText?: string;
  rowOptions?: RowOptions;
  style?: any;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  footerComponent?: React.ReactNode;
  emptyDataComponent?: React.ReactNode;
  rowHeight?: number;
  loadingColums?: boolean;
  amountOfRows?: number;
  handleChangePageExternally?: Function;
  handleChangeRowsPerPageExternally?: Function;
  pageExternally?: number;
  RowsPerPageExternally?: number;
}) {
  const {
    rows = [] as Message[],
    columns = [] as Columns[],
    loading = false,
    tableTitle = "",
    withCheckbox = false,
    withRadioButton = false,
    maxHeight = 500,
    defaultOrder = "asc",
    defaultOrderBy,
    highlightLastRow = false,
    isExpansible = false,
    rowOptions = {},
    style = {},
    rowsPerPageOptions = [5, 7, 10, 25, 50],
    defaultRowsPerPage = 5,
    footerComponent = null,
    emptyDataComponent = null,
    highlightRowDisabled = false,
    rowHeight = 57,
    loadingColums = false,
    amountOfRows = 0,
    handleChangePageExternally,
    handleChangeRowsPerPageExternally,
    pageExternally,
  } = props || {};
  const [order, setOrder] = React.useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = React.useState<keyof Message | undefined>(
    defaultOrderBy
  );
  const [selected, setSelected] = React.useState<readonly (number | string)[]>(
    []
  );

  const [selectedRadioButton, setSelectedRadioButton] = React.useState<
    string | number | null
  >(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const { setSelectedMessages, setSelectedRadioButtonMessages } =
    React.useContext(MessageExportContext);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: KeyOfData | string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof Message);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id as number);
      setSelected(newSelected);
      setSelectedMessages(newSelected);
      return;
    }
    setSelected([]);
    setSelectedMessages([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: number | string
  ) => {
    const selectedIndex = selected.indexOf(id as number);
    let newSelected: readonly (number | string)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id as number);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setSelectedMessages(newSelected);
  };

  const handleRadioClick = (
    event: React.MouseEvent<unknown>,
    id: number | string
  ) => {
    setSelectedRadioButton(id);
    setSelectedRadioButtonMessages(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (handleChangePageExternally) {
      handleChangePageExternally(newPage);
    } else {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (handleChangeRowsPerPageExternally && handleChangePageExternally) {
      handleChangeRowsPerPageExternally(parseInt(event.target.value, 10));
      handleChangePageExternally(0);
    } else {
      setPage(0);
    }
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows?.length);

  const visibleRows = React.useMemo(() => {
    if (handleChangeRowsPerPageExternally && handleChangePageExternally) {
      if (orderBy) {
        return stableSort(rows, getComparator(order, orderBy));
      }
      return rows;
    }

    if (orderBy) {
      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, rows, orderBy, page, rowsPerPage]);

  function shouldShowRadioButton(
    withRadioButton: boolean | Function,
    row: Message
  ): boolean {
    if (typeof withRadioButton === "function") {
      return withRadioButton(row);
    } else {
      return !!withRadioButton;
    }
  }

  const showColumnToRadioButton = React.useCallback(() => {
    return visibleRows.some((row) =>
      shouldShowRadioButton(withRadioButton, row)
    );
  }, [visibleRows, withRadioButton]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {tableTitle}
      <TableContainer sx={{ maxHeight: maxHeight, ...style }}>
        <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
          {loading && loadingColums ? (
            <TableContentLoader
              loadingMessage="Cargando Registros..."
              minHeight={(maxHeight as number) - rowHeight}
            />
          ) : (
            <>
              <TableHeader
                withRadioButton={showColumnToRadioButton()}
                withCheckboxAll={withCheckbox}
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
                columns={columns}
                isExpansible={isExpansible}
              />
              <TableBody>
                {loading ? (
                  <TableContentLoader
                    loadingMessage="Cargando Registros..."
                    minHeight={(maxHeight as number) - rowHeight - 32 - 1}
                  />
                ) : (
                  visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id as number);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableContentRows
                        rowHeight={rowHeight}
                        key={row.id}
                        withCheckbox={withCheckbox}
                        withRadioButton={shouldShowRadioButton(
                          withRadioButton,
                          row
                        )}
                        showColumnToRadioButton={showColumnToRadioButton()}
                        row={row}
                        labelId={labelId}
                        isItemSelected={isItemSelected}
                        selectedRadioButton={selectedRadioButton}
                        handleClick={handleClick}
                        handleRadioClick={handleRadioClick}
                        columns={columns}
                        highlightLastRow={highlightLastRow}
                        isLastRow={!index}
                        isExpansible={isExpansible}
                        rowOptions={rowOptions}
                        highlightRowDisabled={highlightRowDisabled}
                      />
                    );
                  })
                )}
                {!loading &&
                  emptyRows > 0 &&
                  (visibleRows.length === 0 ? (
                    <TableContentNoDataBasic
                      height={Math.min(
                        // 57 => rows height, emptyRows => number of empty rows, 32 => padding (16 * 2)
                        rowHeight * emptyRows - 32,
                        // 57 => header height, 32 => padding (16 * 2), 1 => border line
                        (maxHeight as number) - rowHeight - 32 - 1
                      )}
                      component={emptyDataComponent}
                    />
                  ) : (
                    <TableRow style={{ height: rowHeight * emptyRows }}>
                      <StyledTabCell colSpan={11} />
                    </TableRow>
                  ))}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: !!footerComponent ? "space-between" : "flex-end",
        }}
      >
        {footerComponent}

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={amountOfRows || rows?.length}
          rowsPerPage={rowsPerPage}
          page={pageExternally || page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Registros por página:"
          labelDisplayedRows={({ from, to, count }) => (
            <span>
              Página {from} - {to} de {count}
            </span>
          )}
        />
      </div>
    </Paper>
  );
}
