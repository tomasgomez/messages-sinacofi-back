"use client";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { rowOptions } from "../constants";
import {
  StyledTabCell,
} from "../style";
import { TableProps } from "../type";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ExpandableTable from "./expandable-table/expandable-table-inbox";

type CustomCellType = {
  value: any;
  render: any;
  row: any;
  rowOptions?: any;
  highlightLastRow?: boolean;
  isLastRow?: boolean;
};

const CustomCell = ({
  value,
  render: Component,
  row,
  rowOptions,
  highlightLastRow,
  isLastRow,
}: CustomCellType) => {
  return (
    <StyledTabCell
      component="th"
      highlightRow={highlightLastRow && isLastRow}
      scope="row"
      {...rowOptions}
    >
      {Component ? <Component value={value} row={row} /> : value}
    </StyledTabCell>
  );
};

export function TableContentRows(props: TableProps) {
  const {
    handleClick,
    row,
    isItemSelected,
    labelId,
    withCheckbox,
    columns,
    highlightLastRow,
    isLastRow,
    noExtraColumn,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const withActions = columns.some((elem) => elem.id === "actions");
  return (
    <>
      <TableRow
        hover
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        {/* /////////////////////// checkbox /////////////////////// */}
        {withCheckbox && (
          <StyledTabCell padding="checkbox" {...rowOptions["checkbox"]}>
            <Checkbox
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleClick(event, row.id)
              }
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </StyledTabCell>
        )}
        {/* ///////////////////////  Rows /////////////////////// */}
        {columns.map((column: any, idx: number) => (
          <CustomCell
            key={`row-${column?.id}-${idx}`}
            value={row[column?.id] || "-"}
            row={row}
            render={column.render}
            rowOptions={rowOptions[column?.id]}
            highlightLastRow={highlightLastRow}
            isLastRow={isLastRow}
          />
        ))}
        {/* ////////////////// Expandable table Icon /////////////////////// */}
        {!withActions && !noExtraColumn && (
          <StyledTabCell>
            {row.stateProgress && (
              <IconButton
                key={`expand-icon-${row.id}`}
                aria-label="expand row"
                onClick={() => setIsOpen(!isOpen)}
                style={{ padding: 0 }}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </StyledTabCell>
        )}
      </TableRow>
      {/* ////////////////// Expandable table /////////////////////// */}
      <ExpandableTable isOpen={isOpen} />
    </>
  );
}

export default TableContentRows;
