import { Data, SentData } from "../../component/inbox-table/type";
import { DataExpandable, linkAndLabel, StatusMessage } from "../../component/inbox-table/components/expandable-table/type";

export function createData(
  id: number,
  tsn: number,
  ms: number,
  message: string,
  institution: string,
  date: string,
  time: string,
  state: number,
  stateProgress: string,
  nse:string,
  dateSent:string,
  timeSent:string,
  actions:boolean
): SentData {
  return {
    id,
    tsn,
    ms,
    message,
    institution,
    date,
    time,
    state,
    stateProgress,
    dateSent,
    timeSent,
    nse,
    actions
  };
}

export const rows = [
  createData(
    1,
    10139,
    671,
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO (JUAN PÉREZ)",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    2,
    10124,
    671,
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO",
    "HSBC",
    "21/01/2024",
    "11:00",
    17,
    "",
    "102456",
    "12/03/2025",
    "10:00",
    true
  ),
  createData(
    3,
    20125,
    671,
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO",
    "BCI",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    4,
    30126,
    104,
    "ESTADO SALDOS NETOS RESUMIDOS (BANCOS NACIONALES)",
    "Banco Itau",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    5,
    20127,
    105,
    "CAJEROS - SALDOS NETOS",
    "JP Morgan",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    6,
    10128,
    671,
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO",
    "Security",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    7,
    10123,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Banco de Chile",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    8,
    10138,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "ICBC",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    9,
    10124,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Macro",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    10,
    10183,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Patagonia",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    11,
    10166,
    671,
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    12,
    101234,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "HSBC",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    13,
    10125,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    14,
    10127,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "MACRO",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    15,
    10129,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Publico",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    16,
    10133,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "Santander",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
  ),
  createData(
    17,
    10134,
    136,
    "TRANSFERENCIA DE FONDOS INDIVIDUAL",
    "MACRO",
    "21/01/2024",
    "11:00",
    17,
    "",
    "10123",
    "12/04/2023",
    "11:00",
    true
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
