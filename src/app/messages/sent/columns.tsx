import { ModalLink } from "@/app/component/inbox-table/components/table-modal/link";
import {
  Columns,
  Alignment,
  Message,
  RowOptions,
} from "@/app/component/inbox-table/type";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { CopyAll, SendOutlined } from "@mui/icons-material";
import { completeInstitutions } from "@/utils/intitutions";

const AccionesColumn = ({ row }: { row: any }) => {
  const router = useRouter();
  const {
    id = "",
    destination = "",
    messageCode = "",
    status = "",
  } = row || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        key={`expand-icon-${id}`}
        aria-label="expand row"
        style={{ padding: 0 }}
        onClick={() =>
          router.push(
            `/messages/create?institutionId=${destination}&messageCode=${messageCode}&cloneId=${id}`
          )
        }
      >
        <CopyAll />
      </IconButton>
      {status !== "05" && (
        <IconButton
          key={`expand-icon-${id}`}
          aria-label="expand row"
          style={{ padding: 0 }}
        >
          <SendOutlined />
        </IconButton>
      )}
    </Box>
  );
};

const actions: Columns = {
  id: "actions",
  label: "Acciones",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    return <AccionesColumn row={row} />;
  },
};

const destinationInstituion: Columns = {
  id: "destination",
  label: "Destino",
  align: Alignment.LEFT,
  sortable: true,
  render: ({ row }: { row: Message }) => {
    return completeInstitutions(row?.origin);
  },
};

export const columnsSent: Columns[] = [
  {
    id: "TSN",
    label: "TSN",
    align: Alignment.LEFT,
    sortable: true,
    render: ({ row }: { row: Message }) => {
      const { status = "" } = row || {};
      return <ModalLink isInProcess={!!status} data={row} />;
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
  destinationInstituion,
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
  actions,
];

export const rowOptions: RowOptions = {
  TSN: {
    align: Alignment.CENTER,
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
  destination: {
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
  actions: {
    align: Alignment.CENTER,
    style: { padding: 10 },
  },
};
