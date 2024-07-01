import * as React from "react";
import { Box } from "@mui/material";
import {
  StyleInfoColumn,
  StyledDivider,
  StyledTypographyText,
  StyledTypographyData,
} from "./styles";
import { completeInstitutions } from "@/utils/intitutions";
import { statusDictionary } from "@/utils/mortgage-discharge-constants";

const InfoColumn = ({ data }: { data: any }) => {
  const {
    channel = "",
    operationStatus = "",
    buyer = "",
    institutionDestination = "",
    buyerDni = "",
    cukStatus = "",
    institutionCode = "",
  }: {
    channel: string;
    operationStatus: string;
    buyer: string;
    institutionDestination: string;
    buyerDni: string;
    cukStatus: string;
    institutionCode: string;
  } = data || {};

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
      <Box width={80}>
        <StyledTypographyText>Canal</StyledTypographyText>
        <StyledTypographyData>{channel}</StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={150}>
        <StyledTypographyText>Estado Operación</StyledTypographyText>
        <StyledTypographyData>
          {(statusDictionary as { [key: string]: string })[operationStatus] ||
            operationStatus}
        </StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={150}>
        <StyledTypographyText>Comprador</StyledTypographyText>
        <StyledTypographyData>
          {buyerDni}/{buyer}
        </StyledTypographyData>
      </Box>
      <StyledDivider orientation="vertical" flexItem />
      <Box width={150}>
        <StyledTypographyText>
          {getInstitutionText(cukStatus)}
        </StyledTypographyText>
        <StyledTypographyData>
          {completeInstitutions(getInstitution(cukStatus))}
        </StyledTypographyData>
      </Box>
    </StyleInfoColumn>
  );
};

export default InfoColumn;
