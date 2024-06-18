import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";

export const columnsInforms: Columns[] = [
  {
    id: "NSR",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Institución Origen",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Institución Destino",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Tipo de Operación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Notaria",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "N° Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "RUT Comprador",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "RUT Deudor",
    align: Alignment.LEFT,
    sortable: false,
  },
];

export const rowOptions: RowOptions = {
  NSR: {
    align: Alignment.CENTER,
  },
};
