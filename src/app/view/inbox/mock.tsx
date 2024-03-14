import { Data } from "../../component/inbox-table/type";
import { DataExpandable, linkAndLabel, StatusMessage } from "../../component/inbox-table/components/expandable-table/type";

export function createData(
  id: number,
  osn: number,
  ms: number,
  message: string,
  institution: string,
  date: string,
  time: string,
  state: number,
  stateProgress: string
): Data {
  return {
    id,
    osn,
    ms,
    message,
    institution,
    date,
    time,
    state,
    stateProgress,
  };
}

export const rows = [
  createData(
    1,
    100123,
    101,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "inProgress"
  ),
  createData(
    2,
    100124,
    102,
    "SOLICITUDES DE REEMBOLSO",
    "HSBC",
    "21/01/2024",
    "11:00",
    17,
    "inProgress"
  ),
  createData(
    3,
    200125,
    103,
    "COMPROMISOS FUTUROS",
    "BCI",
    "21/01/2024",
    "11:00",
    17,
    "inProgress"
  ),
  createData(
    4,
    300126,
    104,
    "ESTADO SALDOS NETOS RESUMIDOS (BANCOS NACIONALES)",
    "Banco Itau",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    5,
    400127,
    105,
    "CAJEROS - SALDOS NETOS",
    "JP Morgan",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    6,
    500128,
    106,
    "ESTADO SALDOS NETOSMRESUMIDOS (BANCOS EXTRANJEROS)",
    "Security",
    "21/01/2024",
    "11:00",
    17,
    "inProgress"
  ),
  createData(
    7,
    13010,
    107,
    "ACEPTACION ALZAMIENTO HIPOTECARIO (JUAN PEREZ)",
    "Banco de Chile",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    8,
    13011,
    108,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "ICBC",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    9,
    100124,
    109,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Macro",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    10,
    200125,
    110,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Patagonia",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    11,
    300126,
    111,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "inProgress"
  ),
  createData(
    12,
    400127,
    112,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "HSBC",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    13,
    500128,
    113,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    14,
    13010,
    114,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "MACRO",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    15,
    13011,
    115,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Publico",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    16,
    500228,
    116,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
  createData(
    17,
    19910,
    117,
    "TRANFERENCIA DE FONDOS INDIVIDUAL",
    "MACRO",
    "21/01/2024",
    "11:00",
    17,
    ""
  ),
];

export function createDataExpand(
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
  createDataExpand(
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
  createDataExpand(
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
  createDataExpand(
    3,
    "MS 674 - Solicitud Liquidacion de Prepago",
    StatusMessage.PENDING
  ),
  createDataExpand(
    4,
    "MS 675 - Liquidación de Prepago ",
    StatusMessage.PENDING
  ),
  createDataExpand(5, "MS 676 - Datos para el Pago AH", StatusMessage.PENDING),
  createDataExpand(6, "MS 677 - Aviso de Pago", StatusMessage.PENDING),
  createDataExpand(7, "MS 678 - Rechazo de Pago", StatusMessage.PENDING),
  createDataExpand(8, "MS 679 - Aceptacion de Pago", StatusMessage.PENDING),
];
