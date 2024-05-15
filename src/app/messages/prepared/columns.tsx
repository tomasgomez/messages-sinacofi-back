import { ModalLink } from "@/app/component/inbox-table/components/table-modal/link";
import {
  Columns,
  Alignment,
  Message,
  RowOptions,
} from "@/app/component/inbox-table/type";

export const columnsPrepared: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    sortable: true,
    render: ({ row }: { row: Message }) => {
      return <ModalLink isInProcess={!!row.status} data={row} />;
    },
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "messageCode",
    label: "MSG",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "description",
    label: "Descripción",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "receiver",
    label: "Destino",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "receivedDate",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "receivedTime",
    label: "Hora",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
    sortable: true,
  },
];

export const rowOptions: RowOptions = {
  TSN: {
    align: Alignment.LEFT,
  },
  creationDate: {
    align: Alignment.LEFT,
  },
  creationTime: {
    align: Alignment.LEFT,
  },
  messageCode: {
    align: Alignment.LEFT,
  },
  description: {
    align: Alignment.LEFT,
  },
  receiver: {
    align: Alignment.LEFT,
  },
  receivedDate: {
    align: Alignment.LEFT,
  },
  receivedTime: {
    align: Alignment.LEFT,
  },
  NSE: {
    align: Alignment.LEFT,
  },
};
