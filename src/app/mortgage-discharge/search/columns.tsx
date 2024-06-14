import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";

export const columnsSearch: Columns[] = [
  {
    id: "NSR",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "messageCode",
    label: "Fecha de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "description",
    label: "Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "LSN",
    label: "Fecha de Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationDate",
    label: "OSN",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationTime",
    label: "Acciones",
    align: Alignment.LEFT,
    sortable: false,
  },
];

export const rowOptions: RowOptions = {
  NSR: {
    align: Alignment.CENTER,
  },
  messageCode: {
    align: Alignment.LEFT,
  },
  description: {
    align: Alignment.LEFT,
  },
  LSN: {
    align: Alignment.CENTER,
  },
  creationDate: {
    align: Alignment.LEFT,
  },
  creationTime: {
    align: Alignment.LEFT,
  },
};
