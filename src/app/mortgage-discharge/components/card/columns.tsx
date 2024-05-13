"use client";

import { Columns, Alignment } from "@/app/component/inbox-table/type";
import React, { useContext } from "react";
import { IconButton, Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CardContext } from "../../in-process/store/ModalStore";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { base64ToBlob, downloadFile } from "./utils";

const AccionesColumn = ({ row }: { row: any }) => {
  const { status, messageCode } = row;
  const { setModalIsOpen, setSelectedMessage } = useContext(CardContext);
  const router = useRouter();

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
      {status === "01" && (
        <IconButton
          key={`drive-icon-${row.id}`}
          aria-label="DriveFileRenameOutlineIcon"
          style={{ padding: 0, color: "#00B2E2" }}
          onClick={() =>
            messageCode === "670"
              ? router.push(
                  `/messages/create?institutionId=${row.receiver}&messageCode=${messageCode}&messageId=${row.id}`
                )
              : router.push(
                  `/messages/create?institutionId=${row.receiver}&messageCode=${messageCode}&cukCode=${row.cukCode}`
                )
          }
        >
          {messageCode === "670" ? (
            <DriveFileRenameOutlineIcon />
          ) : (
            <SendOutlinedIcon />
          )}
        </IconButton>
      )}
      {(!status || status === "-") && (
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
      {/* Detail Icon */}
      {(status === "05" || status === "06") && (
        <IconButton
          key={`detail-icon-${row.id}`}
          aria-label="DetailOutlineIcon"
          style={{ padding: 0, color: "#565656" }}
          onClick={() => handlerOpenModal(row)}
        >
          <InfoOutlinedIcon />
        </IconButton>
      )}
      {/* TODO ADD Sent Icon */}
    </Box>
  );
};

const acciones: Columns = {
  id: "actions",
  label: "Acciones",
  align: Alignment.CENTER,
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
