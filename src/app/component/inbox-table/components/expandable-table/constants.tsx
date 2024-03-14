import {
  ColumnsDataExpandableTable,
  Alignment,
  RowOptionsExpandableTable,
} from "./type";

export const columnsExpandableTable: ColumnsDataExpandableTable[] = [
  {
    id: "code",
    accessor: "code",
    label: "Codigo/Mensaje",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "state",
    accessor: "state",
    label: "Estado",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "osn",
    accessor: "osn",
    label: "OSN",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "datetimeReception",
    accessor: "datetimeReception",
    label: "Fecha y Hora de Recepcion",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "nse",
    accessor: "nse",
    label: "NSE",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "datetimeSend",
    accessor: "datetimeSend",
    label: "Fecha y Hora de Envio",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "nsr",
    accessor: "nsr",
    label: "NSR",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "nsq",
    accessor: "nsq",
    label: "NSQ",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "docs",
    accessor: "docs",
    label: "Docs.",
    align: Alignment.LEFT,
    fontSize: 13,
  },
  {
    id: "state",
    accessor: "state",
    label: "Acciones",
    align: Alignment.LEFT,
    fontSize: 13,
  },
];

export const rowOptionExpand: RowOptionsExpandableTable = {
  code: {
    // maxwidth: number,
    // minwidth: number,
    // isBlod: bool,
    // fontSize: number,
    align: Alignment.LEFT,
    fontSize: 13,
  },
  state: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  osn: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  datetimeReception: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  nse: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  datetimeSend: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  nsr: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  nsq: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  docs: {
    align: Alignment.LEFT,
    fontSize: 13,
  },
  action: {
    align: Alignment.CENTER,
    fontSize: 13,
  },
};
