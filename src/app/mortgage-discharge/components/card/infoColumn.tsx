import * as React from "react";
import { Box, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
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
    OperationStatus,
    Buyer,
    OriginInstitution,
  }: {
    channel: string;
    OperationStatus: string;
    Buyer: string;
    OriginInstitution: string;
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
        <StyledTypographyData>{OperationStatus}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={160}>
        <StyledTypographyText>Comprador</StyledTypographyText>
        <StyledTypographyData>{Buyer}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={110}>
        <StyledTypographyText>Institución Origen</StyledTypographyText>
        <StyledTypographyData>{OriginInstitution}</StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
