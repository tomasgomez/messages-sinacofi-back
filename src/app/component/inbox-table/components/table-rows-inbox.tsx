"use client";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { StyledTabCell } from "../style";
import { Message, RowOptions, TableProps } from "../type";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ExpandableTable from "./expandable-table/expandable-table-inbox";
import Radio from "@mui/material/Radio";
// import { isMortgageDischargeMessage } from "@/utils/mortgage-discharge-utils";

const isHighlightRow = (
  highlightLastRow: boolean,
  isLastRow: boolean,
  isRadioButtonSelected: boolean | null,
  withRadioButton: boolean,
  row: Message,
  highlightRowDisabled: boolean
) => {
  if (highlightRowDisabled) return false;
  if (highlightLastRow) return isLastRow;
  if (withRadioButton && (row?.status === "01" || !row?.status)) {
    return !!isRadioButtonSelected;
  }
  if (!withRadioButton) return row?.status === "01" || !row?.status;
};

const isHighlightRejected = (isLastRow: boolean, row: Message) =>
  isLastRow && row?.status === "06" && row?.messageCode === "672";

const withBorderLeft = (
  highlightLastRow: boolean,
  isLastRow: boolean,
  isFirstColumn: boolean
) => highlightLastRow && isLastRow && isFirstColumn;

type CustomCellType = {
  value: any;
  render: any;
  row: any;
  rowOptions?: any;
  highlightRow?: boolean;
  highlightRowRejected?: boolean;
  withBorderLeft?: boolean;
  rowHeight: number;
};

const CustomCell = ({
  value,
  render: Component,
  row,
  rowOptions,
  highlightRow = false,
  highlightRowRejected,
  withBorderLeft,
  rowHeight,
}: CustomCellType) => {
  return (
    <StyledTabCell
      component="th"
      highlightRow={highlightRow}
      highlightRowRejected={highlightRowRejected}
      withBorderLeft={withBorderLeft}
      scope="row"
      style={{ height: rowHeight, ...rowOptions?.style }}
      align={rowOptions?.align}
    >
      {Component ? <Component value={value} row={row} /> : value}
    </StyledTabCell>
  );
};

export function TableContentRows(props: TableProps) {
  const {
    handleClick = () => null,
    handleRadioClick = () => null,
    row = {} as Message,
    isItemSelected = false,
    labelId = "",
    withCheckbox = false,
    withRadioButton = false,
    showColumnToRadioButton = false,
    columns = [],
    highlightLastRow = false,
    isLastRow = false,
    isExpansible = false,
    rowOptions = {} as RowOptions,
    selectedRadioButton = null,
    highlightRowDisabled = false,
    rowHeight = 57,
  } = props || {};

  const [isOpen, setIsOpen] = React.useState(false);

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
                handleClick(event, row?.id)
              }
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </StyledTabCell>
        )}

        {/* /////////////////////// RadioButton /////////////////////// */}
        {showColumnToRadioButton && (
          <StyledTabCell
            padding="checkbox"
            style={{
              background: selectedRadioButton === row?.id ? "#EFFCFF" : "",
            }}
          >
            {withRadioButton && (
              <Radio
                checked={selectedRadioButton === row?.id}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  handleRadioClick(event, row?.id)
                }
                inputProps={{ "aria-labelledby": labelId }}
              />
            )}
          </StyledTabCell>
        )}
        {/* ///////////////////////  Rows /////////////////////// */}
        {columns.map((column: any, idx: number) => (
          <CustomCell
            rowHeight={rowHeight}
            key={`row-${column?.id}-${idx}`}
            value={row[column?.id as keyof Message] || "-"}
            row={row}
            render={column?.render}
            rowOptions={rowOptions[column?.id]}
            highlightRow={isHighlightRow(
              highlightLastRow,
              isLastRow,
              selectedRadioButton === row?.id,
              withRadioButton,
              row,
              highlightRowDisabled
            )}
            highlightRowRejected={isHighlightRejected(isLastRow, row)}
            withBorderLeft={withBorderLeft(highlightLastRow, isLastRow, !idx)}
          />
        ))}
        {/* ////////////////// Expandable table Icon /////////////////////// */}
        {isExpansible && (
          <StyledTabCell>
            {/* {isMortgageDischargeMessage(row?.messageCode) && ( */}
            {false && (
              <IconButton
                key={`expand-icon-${row?.id}`}
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
      {isExpansible && <ExpandableTable isOpen={isOpen} />}
    </>
  );
}

export default TableContentRows;
