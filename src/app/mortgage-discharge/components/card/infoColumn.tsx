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
    clientName,
    institutionDestination,
    clientDni,
    cukStatus,
  }: {
    channel: string;
    operationStatus: string;
    clientName: string;
    institutionDestination: string;
    clientDni: string;
    cukStatus: string;
  } = data;

  const getInstitutionText = (cukStatus: string) => {
    switch (cukStatus) {
      case "06":
        return "Institución Origen";
      default:
        return "Institución Destino";
    }
  };

  return (
    <StyleInfoColumn>
      <Box width={90}>
        <StyledTypographyText>Canal</StyledTypographyText>
        <StyledTypographyData>{channel}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={170}>
        <StyledTypographyText>Estado Operación</StyledTypographyText>
        <StyledTypographyData>{operationStatus}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={170}>
        <StyledTypographyText>Comprador</StyledTypographyText>
        <StyledTypographyData>
          {clientDni}/{clientName}
        </StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={110}>
        <StyledTypographyText>
          {getInstitutionText(cukStatus)}
        </StyledTypographyText>
        <StyledTypographyData>{institutionDestination}</StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
