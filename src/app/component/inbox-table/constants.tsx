import { Columns, Alignment, RowOptions } from "./type";

export const columnsInbox: Columns[] = [
  {
    id: "osn",
    label: "OSN",
    align: Alignment.CENTER,
  },
  {
    id: "ms",
    label: "MS",
    align: Alignment.LEFT,
  },
  {
    id: "message",
    label: "Mensaje",
    align: Alignment.LEFT,
  },
  {
    id: "institution",
    label: "Institucion",
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
    id: "state",
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
  },
  ms: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  message: {
    maxwidth: 450,
    align: Alignment.LEFT,
    fontSize: 14,
  },
  institution: {
    align: Alignment.LEFT,
    fontSize: 14,
  },
  date: {
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
  },
};
