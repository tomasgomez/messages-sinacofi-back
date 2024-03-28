import { Columns, Alignment, RowOptions } from "./type";

export const columnsInbox: Columns[] = [
  {
    id: "osn",
    label: "OSN",
    align: Alignment.LEFT,
  },
  {
    id: "date",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "time",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "ms",
    label: "MSG",
    align: Alignment.LEFT,
  },
  {
    id: "message",
    label: "Descripción",
    align: Alignment.LEFT,
  },
  {
    id: "institution",
    label: "Origen",
    align: Alignment.LEFT,
  },
  {
    id: "dateSent",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "timeSent",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "nse",
    label: "NSE",
    align: Alignment.LEFT,
  },
  {
    id: "state",
    label: "Estado",
    align: Alignment.LEFT,
  },
];

export const columnsSent: Columns[] = [
  {
    id: "tsn",
    label: "TSN",
    align: Alignment.LEFT,
  },
  {
    id: "date",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "time",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "ms",
    label: "MSG",
    align: Alignment.LEFT,
  },
  {
    id: "message",
    label: "Descripción",
    align: Alignment.LEFT,
  },
  {
    id: "institution",
    label: "Origen",
    align: Alignment.LEFT,
  },
  {
    id: "dateSent",
    label: "Fecha",
    align: Alignment.LEFT,
  },
  {
    id: "timeSent",
    label: "Hora",
    align: Alignment.LEFT,
  },
  {
    id: "nse",
    label: "NSE",
    align: Alignment.LEFT,
  },
  {
    id: "state",
    label: "Estado",
    align: Alignment.LEFT,
  },
  {
    id: "actions",
    label: "Actions",
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
    maxwidth:30
  },
  nse: {
    align: Alignment.LEFT,
    fontSize: 14,
    maxwidth:30
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
    maxwidth:90,
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
    maxwidth:30
  },
  timeSent: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  dateSent: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
};
