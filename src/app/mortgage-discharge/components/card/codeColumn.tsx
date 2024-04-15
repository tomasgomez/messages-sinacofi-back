import * as React from "react";
import { Box, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import { StyledCode } from "./styled";
import StatusChip from "./statusChip";

const CodeColumn = ({
  code,
  date,
  status,
}: {
  code: string;
  date: string;
  status: string;
}) => {
  return (
    <StyledCode>
      <Typography
        fontFamily={montserrat.style.fontFamily}
        fontSize={16}
        fontWeight="600"
        lineHeight={1.5}
      >
        {code}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight="400"
        lineHeight={1.33}
        color="#49454F"
      >
        Fecha de Alzamiento: {date}
      </Typography>
      <StatusChip status={status} />
    </StyledCode>
  );
};

export default CodeColumn;
