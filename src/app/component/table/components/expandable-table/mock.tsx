import { DataExpandable, linkAndLabel } from "./type";
import { StatusMessage } from "./type";
export function createData(
  id: number,
  code: string,
  state: StatusMessage,
  osn?: linkAndLabel,
  datetimeReception?: string,
  nse?: linkAndLabel,
  datetimeSend?: string,
  nsr?: linkAndLabel,
  nsq?: linkAndLabel,
  docs?: linkAndLabel
): DataExpandable {
  return {
    id,
    code,
    state,
    osn,
    datetimeReception,
    nse,
    datetimeSend,
    nsr,
    nsq,
    docs,
  };
}

export const rowExpandableTable = [
  createData(
    1,
    "MS 670 - Alzamiento Hipotecario",
    StatusMessage.SENT,
    { label: 12994, link: "test-link" },
    "21/01/2024 11:00",
    { label: 12994 },
    "15/01/2024 11:00",
    { label: 12994 },
    { label: 12994 },
    { label: 0 }
  ),
  createData(
    2,
    "MS 671 - Aceptación Alzamiento Hipotecario",
    StatusMessage.RECEIVED,
    { label: 12994 },
    "21/01/2024 11:00",
    { label: 12994, link: "test-link" },
    "15/01/2024 11:00",
    { label: 12994 },
    { label: 12994 },
    { label: 2, link: "test-link" }
  ),
  createData(
    3,
    "MS 674 - Solicitud Liquidacion de Prepago",
    StatusMessage.PENDING
  ),
  createData(4, "MS 675 - Liquidación de Prepago ", StatusMessage.PENDING),
  createData(5, "MS 676 - Datos para el Pago AH", StatusMessage.PENDING),
  createData(6, "MS 677 - Aviso de Pago", StatusMessage.PENDING),
  createData(7, "MS 678 - Rechazo de Pago", StatusMessage.PENDING),
  createData(8, "MS 679 - Aceptacion de Pago", StatusMessage.PENDING),
];
