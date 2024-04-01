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
  const isInboxRow=!row.actions

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
          {...rowOptions["OSN"]}
        >
          <ModalLink row={row} isInProcess={!!row.status}/>
        </StyledTabCell>
        <StyledTabCell {...rowOptions["creationDate"]}>{row.creationDate}</StyledTabCell>
        <StyledTabCell {...rowOptions["creationTime"]}>{row.creationTime}</StyledTabCell>
        <StyledTabCell {...rowOptions["messageCode"]}>{row.messageCode}</StyledTabCell>
        <StyledTabCell {...rowOptions["description"]}>
          <StyledMessageContiner>
            <StyledMessage>{row.description}</StyledMessage>
            {row.stateProgress && <StyledChip label="En Proceso" /> /**  TODO: stateProgress update in In Process status */} 
          </StyledMessageContiner>
        </StyledTabCell>
        <StyledTabCell {...rowOptions["sender"]}>
          {row.sender}
        </StyledTabCell>
        <StyledTabCell {...rowOptions["receivedDate"]}>{row.receivedDate}</StyledTabCell>
        <StyledTabCell {...rowOptions["receivedTime"]}>{row.receivedTime}</StyledTabCell>
        <StyledTabCell {...rowOptions["NSE"]}>{row.NSE}</StyledTabCell>
        <StyledTabCell {...rowOptions["status"]}>{row.status}</StyledTabCell>
        {row.actions &&
        <StyledTabCell {...rowOptions["status"]}>
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
        {isInboxRow &&
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
        }
      </TableRow>
      {/* ////////////////// Expandable table /////////////////////// */}
      <ExpandableTable isOpen={isOpen} />
    </>
  );
}

export default TableContentRows;
