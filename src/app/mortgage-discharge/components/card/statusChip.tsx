import * as React from "react";
import { StyledChip } from "./styled";

const StatusChip = ({ status }: { status: string }) => {
  if (status === "sent") {
    return (
      <StyledChip
        colorText="#00B2E2"
        label="Alzamiento Hipotecario Enviado"
        background="#00b2e21a"
      />
    );
  }
  if (status === "received") {
    return (
      <StyledChip
        label="Alzamiento Hipotecario Recibido"
        colorText="#0C2093"
        background="#0c20931a"
      />
    );
  }
  if (status === "pending") {
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
