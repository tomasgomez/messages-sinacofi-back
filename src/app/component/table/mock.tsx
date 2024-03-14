import { Data } from "./type";

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
