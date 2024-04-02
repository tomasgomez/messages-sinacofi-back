import { Data } from "../../component/inbox-table/type";
import { DataExpandable, linkAndLabel, StatusMessage } from "../../component/inbox-table/components/expandable-table/type";

export function createData(
  id: string,
  OSN: string,
  messageCode: string,
  description: string,
  sender: string,
  creationDate: string,
  creationTime: string,
  status: string,
  stateProgress: string,
  NSE:string,
  receivedDate:string,
  receivedTime:string,
): Data {
  return {
    id,
    OSN,
    messageCode,
    description,
    sender,
    creationDate,
    creationTime,
    status,
    stateProgress,
    receivedDate,
    receivedTime,
    NSE
  };
}

export const rows = [
  createData(
    "1",
    "10139",
    "671",
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO (JUAN PÉREZ)",
    "Santander",
    "21/01/2024",
    "11:00",
    "17",
    "inProgress",
    "10123",
    "12/04/2023",
    "11:00"
  ),
  createData(
    "2",
    "10124",
    "671",
    "ACEPTACIÓN ALZAMIENTO HIPOTECARIO",
    "HSBC",
    "21/01/2024",
    "11:00",
    "17",
    "inProgress",
    "102456",
    "12/03/2025",
    "10:00"
  )
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
