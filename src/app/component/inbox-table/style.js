import { styled } from "@mui/system";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";

// TODO: fix mix and max width props
export const StyledTabCell = styled(TableCell)`
  // max-width: ${(props) => props?.maxwidth}px;
  // min-width: ${(props) => props?.minwidth}px;
  // font-size: ${(props) => props?.fontSize}px;
  font-weight: ${(props) => (props?.isBlod ? "bold" : "normal")};
  background: ${(props) => (props?.highlightRow ? "#EFFCFF" : "")};
  text-wrap: nowrap;
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
`;

export const StyledCapitalizedSpan = styled("span")`
  text-transform: capitalize;
`;

export const StyledhighlightLastRow = styled("div")`
  color: #565656;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;

export const StyledCircle = styled("div")`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #00b2e2;
  margin-right: 5px;
`;
