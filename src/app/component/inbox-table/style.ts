import { styled } from "@mui/system";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";

// TODO: fix mix and max width props
export const StyledTabCell = styled(TableCell)`
  background: ${(props: {
    highlightRow?: boolean;
    highlightRowRejected?: boolean;
    withBorderLeft?: boolean;
  }) =>
    props?.highlightRowRejected
      ? "#fcebeb66"
      : props?.highlightRow
      ? "#EFFCFF"
      : ""};
  border-left: ${(props: {
    highlightRow?: boolean;
    withBorderLeft?: boolean;
  }) => (props?.withBorderLeft ? "4px solid #00b2e2" : "")};
  white-space: nowrap;
`;
export const StyledChip = styled(Chip)`
  height: 24px;
  color: white;
  background-color: #00b2e2;
  font-size: 12px;
  margin-left: 5px;
  cursor: default;
`;

export const StyledMessageContiner = styled("div")`
  display: flex;
  align-items: center;
`;

export const StyledMessage = styled("div")`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTableCellHeader = styled(TableCell)`
  width: fit-content;
  font-weight: bold;
  padding-left: 16px;
  white-space: nowrap;
`;

export const StyledCapitalizedSpan = styled("span")`
  text-transform: capitalize;
`;
