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
import { Columns, Data, Order, SentData } from "./type";
import { getComparator, stableSort } from "./utils";

import { TableContentLoader } from "./components/table-content-loader";
import { MessageExportContext } from "../MessageExportProvider";

export default function EnhancedTable(props:{rows: Data[] | SentData[] | any[], columns:Columns[], loading?: boolean, withCheckbox?: boolean, tableTitle?: React.ReactNode}) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("OSN");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {rows, columns, loading, tableTitle, withCheckbox = true  } = props;
  const { setSelectedMessages } = React.useContext(MessageExportContext);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id as number);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
    setSelectedMessages([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, rows, orderBy, page, rowsPerPage]
  );

  return (
    <Paper >
      <TableContainer>
        { tableTitle }
        <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
          <TableHeader
            withCheckboxAll={withCheckbox}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length}
            columns={columns}
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
                    row={row}
                    labelId={labelId}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    columns={columns}
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
      <TablePagination
        rowsPerPageOptions={[5, 7, 10, 25]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
