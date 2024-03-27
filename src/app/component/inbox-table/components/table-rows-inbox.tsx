"use client";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { rowOptions } from "../constants";
import {
  StyledTabCell,
  StyledChip,
  StyledMessageContiner,
  StyledMessage,
} from "../style";
import { TableProps } from "../type";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ExpandableTable from "./expandable-table/expandable-table-inbox";
import Link from "@mui/material/Link";
import { ModalLink } from "./modal-link";
import { Box } from "@mui/material";
import { CopyAll, SendOutlined } from "@mui/icons-material";

export function TableContentRows(props: TableProps) {
  const { handleClick, row, isItemSelected, labelId, withCheckbox } = props;

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
              onClick={(event:React.MouseEvent<HTMLElement>) => handleClick(event, row.id)}
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </StyledTabCell>
        )}
        {/* ///////////////////////  Rows /////////////////////// */}
        <StyledTabCell
          component="th"
          id={labelId}
          scope="row"
          {...rowOptions["osn"]}
        >
          <ModalLink row={row} isInProcess={!!row.stateProgress}/>
        </StyledTabCell>
        <StyledTabCell {...rowOptions["date"]}>{row.date}</StyledTabCell>
        <StyledTabCell {...rowOptions["time"]}>{row.time}</StyledTabCell>
        <StyledTabCell {...rowOptions["ms"]}>{row.ms}</StyledTabCell>
        <StyledTabCell {...rowOptions["message"]}>
          <StyledMessageContiner>
            <StyledMessage>{row.message}</StyledMessage>

            {row.stateProgress && <StyledChip label="En Proceso" />}
          </StyledMessageContiner>
        </StyledTabCell>
        <StyledTabCell {...rowOptions["institution"]}>
          {row.institution}
        </StyledTabCell>
        <StyledTabCell {...rowOptions["dateSent"]}>{row.dateSent}</StyledTabCell>
        <StyledTabCell {...rowOptions["timeSent"]}>{row.timeSent}</StyledTabCell>
        <StyledTabCell {...rowOptions["nse"]}>{row.nse}</StyledTabCell>
        <StyledTabCell {...rowOptions["state"]}>{row.state}</StyledTabCell>
        {row.actions &&
        <StyledTabCell {...rowOptions["state"]}>
        <Box display={'flex'} gap={1}>
        <IconButton
              key={`expand-icon-${row.id}`}
              aria-label="expand row"
              style={{ padding: 0 }}
            >
              <CopyAll/>
            </IconButton>
            <IconButton
              key={`expand-icon-${row.id}`}
              aria-label="expand row"
              style={{ padding: 0 }}
            >
              <SendOutlined/>
            </IconButton>
            </Box>
        </StyledTabCell>
      }

        {/* ////////////////// Expandable table Icon /////////////////////// */}
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
      </TableRow>
      {/* ////////////////// Expandable table /////////////////////// */}
      <ExpandableTable isOpen={isOpen} />
    </>
  );
}

export default TableContentRows;
