"use client";

import {
  Columns,
  Alignment,
  RowOptions,
} from "@/app/component/inbox-table/type";
import React, { useContext } from "react";
import { IconButton, Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CardContext } from "../../in-process/store/ModalStore";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { base64ToBlob, downloadFile } from "./utils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const AccionesColumn = ({ row }: { row: any }) => {
  const { actions, messageCode } = row;
  const { setModalIsOpen, setSelectedMessage } = useContext(CardContext);
  const router = useRouter();
  console.log(actions, "actions");
  const handlerOpenModal = (row: any) => {
    setSelectedMessage(row);
    setModalIsOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {actions.includes("sing") && (
        <IconButton
          key={`drive-icon-${row.id}`}
          style={{ padding: 0, color: "#00B2E2" }}
          onClick={
            () =>
              router.push(
                `/messages/create?institutionId=${row.receiver}&messageCode=${messageCode}&messageId=${row.id}`
              )
            // case sent to the messagecode 670
            // router.push(
            //     `/messages/create?institutionId=${row.receiver}&messageCode=${messageCode}&cukCode=${row.cukCode}`
            //   )
          }
        >
          <DriveFileRenameOutlineIcon />
        </IconButton>
      )}
      {actions.includes("sent") && (
        <IconButton
          key={`sent-icon-${row.id}`}
          style={{ padding: 0, color: "#00B2E2" }}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${row.receiver}&messageCode=${messageCode}&messageId=${row.id}&cukCode=${row.cukCode}`
            )
          }
        >
          <SendOutlinedIcon />
        </IconButton>
      )}
      {actions.includes("details") && (
        <IconButton
          key={`detail-icon-${row.id}`}
          style={{ padding: 0, color: "#565656" }}
          onClick={() => handlerOpenModal(row)}
        >
          <InfoOutlinedIcon />
        </IconButton>
      )}
      {actions.includes("edit") && (
        <IconButton
          key={`edit-icon-${row.id}`}
          style={{ padding: 0, color: "#00B2E2" }}
          onClick={() => null}
        >
          <EditOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
};

const acciones: Columns = {
  id: "actions",
  label: "Acciones",
  align: Alignment.LEFT,
  sortable: false,
  render: ({ row }: { row: any }) => {
    return <AccionesColumn row={row} />;
  },
};

const documents: Columns = {
  id: "documents",
  label: "Adjuntos",
  align: Alignment.LEFT,
  sortable: false,
  render: ({ row }: { row: any }) => {
    if (row?.documents?.length > 0) {
      const handleClick = () => {
        row?.documents.forEach((file: any) => {
          const blob = base64ToBlob(file.content);
          downloadFile(blob, file.documentName);
        });
      };
      return (
        <Link href="#" onClick={handleClick}>
          {row?.documents?.length}
        </Link>
      );
    }
    return "-";
  },
};

export const columnsCard: Columns[] = [
  {
    id: "NSR",
    label: "NSR",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "messageCode",
    label: "Código",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "description",
    label: "Descripción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "LSN",
    label: "LSN",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "status",
    label: "Estado",
    align: Alignment.LEFT,
    sortable: false,
  },
  documents,
  acciones,
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
  status: {
    align: Alignment.LEFT,
  },
  documents: {
    align: Alignment.LEFT,
  },
  actions: {
    align: Alignment.CENTER,
  },
};
