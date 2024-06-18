import React from "react";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import { StyledBody, StyledContentNoDataBasic } from "./styles";

export const TableContentNoDataBasic = ({
  height,
  component,
}: {
  height?: number | string;
  component: React.ReactNode;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={20} component="th" scope="row">
        <StyledContentNoDataBasic
          style={{
            height: height,
          }}
        >
          {component ? (
            component
          ) : (
            <StyledBody>
              <InfoOutlinedIcon style={{ width: 64, height: 64 }} />
              <Typography
                textAlign="center"
                fontFamily={montserrat.style.fontFamily}
                fontSize={16}
                fontWeight={500}
                width={300}
              >
                No hay datos disponibles
              </Typography>
            </StyledBody>
          )}
        </StyledContentNoDataBasic>
      </TableCell>
    </TableRow>
  );
};

export const TableContentLoader = React.memo(TableContentNoDataBasic);
