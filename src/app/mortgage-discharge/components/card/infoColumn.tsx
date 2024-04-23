import * as React from "react";
import { Box } from "@mui/material";
import {
  StyleInfoColumn,
  StyledDivider,
  StyledTypographyText,
  StyledTypographyData,
} from "./styled";
import StatusChip from "./statusChip";

const InfoColumn = ({ data }: { data: any }) => {
  const {
    channel,
    operationStatus,
    buyer,
    receiver,
  }: {
    channel: string;
    operationStatus: string;
    buyer: string;
    receiver: string;
  } = data;
  return (
    <StyleInfoColumn>
      <Box width={90}>
        <StyledTypographyText>Canal</StyledTypographyText>
        <StyledTypographyData>{channel}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={180}>
        <StyledTypographyText>Estado Operación</StyledTypographyText>
        <StyledTypographyData>{operationStatus}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={160}>
        <StyledTypographyText>Comprador</StyledTypographyText>
        <StyledTypographyData>{buyer}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={110}>
        <StyledTypographyText>Institución Origen</StyledTypographyText>
        <StyledTypographyData>{receiver}</StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
