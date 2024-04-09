import { Columns, Alignment, RowOptions } from "./type";

export const columnsInbox: Columns[] = [
  {
    id: "OSN",
    label: "OSN",
    align: Alignment.LEFT,
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "messageCode",
    label: "MSG",
    align: Alignment.LEFT,
  },
  {
    id: "description",
    label: "Descripción",
    align: Alignment.LEFT,
  },
  {
    id: "sender",
    label: "Origen",
    align: Alignment.LEFT,
  },
  {
    id: "receivedDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "receivedTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
  },
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
  },
];

export const columnsSent: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    align: Alignment.LEFT,
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "creationTime",
    label: "MSG",
    align: Alignment.LEFT,
  },
  {
    id: "messageCode",
    label: "Descripción",
    align: Alignment.LEFT,
  },
  {
    id: "sender",
    label: "Origen",
    align: Alignment.LEFT,
  },
  {
    id: "receivedDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "receivedTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
  },
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
  },
];

export const columnsPrepared: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    align: Alignment.LEFT,
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "creationTime",
    label: "MSG",
    align: Alignment.LEFT,
  },
  {
    id: "messageCode",
    label: "Descripción",
    align: Alignment.LEFT,
  },
  {
    id: "receiver",
    label: "Destino",
    align: Alignment.LEFT,
  },
  {
    id: "receivedDate",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "receivedTime",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
  },
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
  },
];

export const rowOptions: RowOptions = {
  checkbox: {
    // maxwidth: number,
    // minwidth: number,
    // isBlod: bool,
    // fontSize: number,
    align: Alignment.LEFT,
    fontSize: 14,
  },
  osn: {
    align: Alignment.LEFT,
    fontSize: 14,
    maxwidth: 30,
  },
  nse: {
    align: Alignment.LEFT,
    fontSize: 14,
    maxwidth: 30,
  },
  ms: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  message: {
    maxwidth: 280,
    align: Alignment.LEFT,
    fontSize: 14,
  },
  institution: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  date: {
    maxwidth: 90,
    align: Alignment.LEFT,
    fontSize: 14,
  },
  time: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  state: {
    align: Alignment.LEFT,
    fontSize: 14,
    maxwidth: 30,
  },
  timeSent: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  dateSent: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  actions: {
    align: Alignment.CENTER,
  },
};
