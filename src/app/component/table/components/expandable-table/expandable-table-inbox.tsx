import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTabCell, StyledTableCellHeader } from "../../styled";
import { rowExpandableTable } from "./mock";
import { columnsExpandableTable, rowOptionExpand } from "./constants";
import Collapse from "@mui/material/Collapse";
import { LabelLink, getItem, getState } from "./utils";

export default function ExpandableTable(props: { isOpen: boolean }) {
  const { isOpen } = props;

  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={10}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Table aria-label="purchases">
            {/* //////// Header ////// */}
            <TableHead>
              <TableRow>
                {columnsExpandableTable.map((columnsData) => (
                  <StyledTableCellHeader
                    key={columnsData.id}
                    align={columnsData.align}
                    style={{ fontSize: columnsData.fontSize }}
                    padding="normal"
                  >
                    <span>{columnsData.label}</span>
                  </StyledTableCellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* //////// Rows ////// */}
              {rowExpandableTable.map((row, index) => (
                <TableRow sx={{ width: "100%" }} key={row.id}>
                  <StyledTabCell {...rowOptionExpand["code"]}>
                    {row.code}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["state"]}>
                    {getState(row.state)}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["osn"]}>
                    {LabelLink(row.osn)}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["datetimeReception"]}>
                    {row.datetimeReception ? row.datetimeReception : "-"}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["nse"]}>
                    {LabelLink(row.nse)}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["datetimeSend"]}>
                    {row.datetimeSend ? row.datetimeSend : "-"}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["nsr"]}>
                    {LabelLink(row.nsr)}
                  </StyledTabCell>
                  <StyledTabCell>{LabelLink(row.nsq)}</StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["docs"]}>
                    {LabelLink(row.docs)}
                  </StyledTabCell>
                  <StyledTabCell {...rowOptionExpand["action"]}>
                    {getItem(rowExpandableTable, index, row.state)}
                  </StyledTabCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
