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
    clientName,
    institutionDestination,
  }: {
    channel: string;
    operationStatus: string;
    clientName: string;
    institutionDestination: string;
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
        <StyledTypographyData>{clientName}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={110}>
        <StyledTypographyText>Institución Origen</StyledTypographyText>
        <StyledTypographyData>{institutionDestination}</StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
