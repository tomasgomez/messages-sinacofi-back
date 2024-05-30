import * as React from "react";
import { Box, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import { StyledCode } from "./styled";
import StatusChip from "./statusChip";

const CodeColumn = ({ data }: { data: any }) => {
  const {
    cukCode = "",
    foreclosureDate = "",
    cukStatus = "",
    lastMessageCode = "",
  } = data || {};
  return (
    <StyledCode>
      <Typography
        fontFamily={montserrat.style.fontFamily}
        fontSize={16}
        fontWeight="600"
        lineHeight={1.5}
      >
        {cukCode}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight="400"
        lineHeight={1.33}
        color="#49454F"
      >
        Fecha de Alzamiento: {foreclosureDate}
      </Typography>
      <StatusChip status={cukStatus} messageCode={lastMessageCode} />
    </StyledCode>
  );
};

export default CodeColumn;
