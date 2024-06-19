import React from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Typography, styled } from "@mui/material";
import { montserrat } from "@/utils/fonts";

export const StyledBody = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #898989;
  gap: 16px;
`;

const NoContent = (
  <StyledBody>
    <InfoOutlinedIcon style={{ width: 64, height: 64 }} />
    <Typography
      textAlign="center"
      fontFamily={montserrat.style.fontFamily}
      fontSize={14}
      fontWeight={500}
      width={300}
    >
      Rellena los filtros superiores y presiona “Buscar” para ver los resultados
    </Typography>
  </StyledBody>
);

export default NoContent;
