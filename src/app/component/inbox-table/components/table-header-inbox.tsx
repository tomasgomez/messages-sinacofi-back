import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableProps, KeyOfData } from "../type";
import { StyledTableCellHeader } from "../style";
import TableSortLabel from "@mui/material/TableSortLabel";

export function TableHeader(props: EnhancedTableProps) {
  const {
    onSelectAllClick = () => null,
    order = "asc",
    orderBy,
    numSelected = 0,
    rowCount = 0,
    onRequestSort = () => null,
    withCheckboxAll = false,
    columns = [],
    isExpansible = false,
    withRadioButton = false,
  } = props;

  const createSortHandler =
    (property: KeyOfData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {withCheckboxAll && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {withRadioButton && <TableCell />}
        {columns.map((columnsData) =>
          columnsData.sortable ? (
            <StyledTableCellHeader
              key={columnsData.id}
              padding="none"
              align={columnsData.align}
              style={columnsData.style}
              sortDirection={orderBy === columnsData.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === columnsData.id}
                direction={orderBy === columnsData.id ? order : "asc"}
                onClick={createSortHandler(columnsData.id)}
              >
                {columnsData.label}
              </TableSortLabel>
            </StyledTableCellHeader>
          ) : (
            <StyledTableCellHeader
              align={columnsData.align}
              key={columnsData.id}
              style={columnsData.style}
              padding="normal"
            >
              {columnsData.label}
            </StyledTableCellHeader>
          )
        )}
        {isExpansible && <TableCell />}
      </TableRow>
    </TableHead>
  );
}
