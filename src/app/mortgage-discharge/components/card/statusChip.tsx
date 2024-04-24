import * as React from "react";
import { StyledChip } from "./styled";

const StatusChip = ({ status }: { status: string }) => {
  if (status === "05") {
    return (
      <StyledChip
        colorText="#00B2E2"
        label="Alzamiento Hipotecario Enviado"
        background="#00b2e21a"
      />
    );
  }
  if (status === "06") {
    return (
      <StyledChip
        label="Alzamiento Hipotecario Recibido"
        colorText="#0C2093"
        background="#0c20931a"
      />
    );
  }
  if (status === "01") {
    return (
      <StyledChip
        label="Pendiente de Firma"
        colorText="#00B2E2"
        background="#00b2e21a"
      />
    );
  }
};

export default StatusChip;
