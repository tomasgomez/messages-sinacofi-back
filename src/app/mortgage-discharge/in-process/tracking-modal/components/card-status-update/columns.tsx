import {
  Columns,
  Alignment,
  RowOptions,
} from "@/app/component/inbox-table/type";

export const columnData: Columns[] = [
  {
    id: "status",
    label: "Estado",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "date",
    align: Alignment.LEFT,
    label: "Fecha de Estado",
    sortable: false,
    style: { width: 270 },
  },
];

export const rowOptions: RowOptions = {
  status: {
    align: Alignment.LEFT,
  },
  date: {
    align: Alignment.LEFT,
  },
};

export const rowData = [
  {
    status: "021 - Evaluación Alzamiento Hipotecario En Proceso",
    date: "2021-04-04 16:40:00",
  },
  {
    status: "041 - Firma de Escritura en Proceso",
    date: "2021-05-05 16:40:00",
  },
  {
    status: "022 - Evaluación Alzamiento Hipotecario Aprobada",
    date: "2021-04-12 16:40:00",
  },
  {
    status: "01 - Envio Alzamiento Hipotecario",
    date: "2021-03-01 16:40:00",
  },
];
