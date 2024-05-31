import { ModalLink } from "@/app/component/inbox-table/components/table-modal/link";
import {
  StyledChip,
  StyledMessage,
  StyledMessageContiner,
} from "@/app/component/inbox-table/style";
import {
  Columns,
  Alignment,
  RowOptions,
  Message,
} from "@/app/component/inbox-table/type";
import { isMortgageDischargeMessage } from "@/utils/mortgage-discharge-utils";

const descriptor: Columns = {
  id: "description",
  label: "Descripción",
  align: Alignment.LEFT,
  render: ({ row }: { row: any }) => {
    const { description = "", messageCode = "" } = row || {};
    return (
      <StyledMessageContiner>
        <StyledMessage>{description}</StyledMessage>
        {isMortgageDischargeMessage(messageCode) && (
          <StyledChip label="En Proceso" />
        )}
      </StyledMessageContiner>
    );
  },
};

const ONS_COLUMN: Columns = {
  id: "OSN",
  label: "OSN",
  align: Alignment.LEFT,
  render: ({ row }: { row: Message }) => {
    return <ModalLink isInProcess={!!row?.status} data={row} />;
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
    id: "origin",
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
];

export const rowOptions: RowOptions = {
  checkbox: {
    // fontSize: number,
    align: Alignment.LEFT,
    // style: {}
  },
  OSN: {
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
  origin: {
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
