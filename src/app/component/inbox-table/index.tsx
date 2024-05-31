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
  isExpansible?: boolean;
  endDetailsText?: string;
  rowOptions?: RowOptions;
  footerComponent?: React.ReactNode;
  style?: any;
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
    footerComponent = null,
    isExpansible = false,
    rowOptions = {},
    style = {},
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { setSelectedMessages, setSelectedRadioButtonMessages } =
    React.useContext(MessageExportContext);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: KeyOfData
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows?.length);

  const visibleRows = React.useMemo(() => {
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
    <Paper style={{ overflow: "inherit" }}>
      <TableContainer style={{ maxHeight, ...style }}>
        {tableTitle}
        <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
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
              <TableContentLoader loadingMessage="Cargando Registros..." />
            ) : (
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id as number);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableContentRows
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
                  />
                );
              })
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 57 * emptyRows,
                }}
              >
                <StyledTabCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
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
          rowsPerPageOptions={[5, 7, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
