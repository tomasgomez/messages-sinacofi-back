import * as React from "react";
import { StyledChip } from "./styled";

const getChipText = (messageCode: string, status: string) => {
  if (messageCode === "672") {
    return "Alzamiento Hipotecario Rechazado";
  }
  if (messageCode === "673") {
    return "Cliente en Normalización";
  }
  if (status === "01") {
    return messageCode === "670" ? "Pendiente de Firma" : "Pendiente de Envío";
  }
  if (status === "05") {
    return "Alzamiento Hipotecario Enviado";
  }
  if (status === "06") {
    return "Alzamiento Hipotecario Recibido";
  }
};
const getChipColor = (messageCode: string, status: string) => {
  if (messageCode === "672") {
    return "#E23232";
    // #FCEBEB
  }
  if (messageCode === "673") {
    return "#FFC600";
    //#FFF9E6 backgorun
  }
  if (status === "01") {
    return "#00B2E2";
  }
  if (status === "05") {
    return "#00B2E2";
  }
  if (status === "06") {
    return "#0C2093";
  }
};
const getChipBackgroundColor = (messageCode: string, status: string) => {
  if (messageCode === "672") {
    return "#FCEBEB";
  }
  if (messageCode === "673") {
    return "#FFF9E6";
  }
  if (status === "01") {
    return "#00b2e21a";
  }
  if (status === "05") {
    return "#00b2e21a";
  }
  if (status === "06") {
    return "#0c20931a";
  }
};

const StatusChip = ({
  status,
  messageCode,
}: {
  status: string;
  messageCode: string;
}) => {
  return (
    <StyledChip
      label={getChipText(messageCode, status)}
      colorText={getChipColor(messageCode, status)}
      background={getChipBackgroundColor(messageCode, status)}
    />
  );
};

export default StatusChip;
