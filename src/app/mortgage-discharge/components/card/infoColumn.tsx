import * as React from "react";
import { Box } from "@mui/material";
import {
  StyleInfoColumn,
  StyledDivider,
  StyledTypographyText,
  StyledTypographyData,
} from "./styled";

const InfoColumn = ({ data }: { data: any }) => {
  const {
    channel,
    operationStatus,
    buyer,
    institutionDestination,
    buyerDni,
    cukStatus,
    institutionCode,
  }: {
    channel: string;
    operationStatus: string;
    buyer: string;
    institutionDestination: string;
    buyerDni: string;
    cukStatus: string;
    institutionCode: string;
  } = data;

  const getInstitutionText = (cukStatus: string) => {
    switch (cukStatus) {
      case "06":
        return "Institución Origen";
      default:
        return "Institución Destino";
    }
  };

  const getInstitution = (cukStatus: string) => {
    switch (cukStatus) {
      case "06":
        return institutionCode;
      default:
        return institutionDestination;
    }
  };

  return (
    <StyleInfoColumn>
      <Box width="auto" maxWidth={90}>
        <StyledTypographyText>Canal</StyledTypographyText>
        <StyledTypographyData>{channel}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box minWidth={90} width="auto" maxWidth={170}>
        <StyledTypographyText>Estado Operación</StyledTypographyText>
        <StyledTypographyData>{operationStatus}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box minWidth={90} width="auto" maxWidth={170}>
        <StyledTypographyText>Comprador</StyledTypographyText>
        <StyledTypographyData>
          {buyerDni}/{buyer}
        </StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box minWidth={90} width="auto" maxWidth={110}>
        <StyledTypographyText>
          {getInstitutionText(cukStatus)}
        </StyledTypographyText>
        <StyledTypographyData>{getInstitution(cukStatus)}</StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
