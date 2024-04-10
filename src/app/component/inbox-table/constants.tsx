import { ModalLink } from "./components/modal-link";
import { StyledChip, StyledMessage, StyledMessageContiner } from "./style";
import { Columns, Alignment, RowOptions, Data } from "./type";

const descriptor: Columns = {
  id: "description",
  label: "Descripción",
  align: Alignment.LEFT,
  render: ({ row }: { row: any }) => {
    return (
      <StyledMessageContiner>
        <StyledMessage>{row.description}</StyledMessage>
        {row.stateProgress && <StyledChip label="En Proceso" />}
      </StyledMessageContiner>
    );
  },
};

const ONS_COLUMN: Columns = {
  id: "OSN",
  label: "OSN",
  align: Alignment.LEFT,
  render: ({ row }: { row: Data }) => {
    return <ModalLink isInProcess={!!row.status} row={row} />;
  },
};

export const columnsInbox: Columns[] = [
  ONS_COLUMN,
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
  descriptor,
  {
    id: "sender",
    label: "Origen",
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
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
    sortable: true,
  },
];

export const columnsSent: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    align: Alignment.LEFT,
    sortable: true,
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
    id: "creationTime",
    label: "MSG",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "messageCode",
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
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
    sortable: true,
  },
];

export const columnsPrepared: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    align: Alignment.LEFT,
    sortable: true,
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
    id: "creationTime",
    label: "MSG",
    align: Alignment.LEFT,
    sortable: true,
  },
  {
    id: "messageCode",
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
  {
    id: "stateProgress",
    label: "Estado",
    align: Alignment.LEFT,
    sortable: true,
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
