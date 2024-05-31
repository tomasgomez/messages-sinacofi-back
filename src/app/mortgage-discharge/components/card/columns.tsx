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
import { base64ToBlob, downloadFile } from "../../utils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SessionProviderContext } from "@/context/SessionProvider";
import { MessageExportContext } from "@/app/component/MessageExportProvider";

const AccionesColumn = ({ row }: { row: any }) => {
  const {
    actions = [],
    messageCode = "",
    status = "",
    destination = "",
    id = "",
    cukCode = "",
  } = row || {};
  const { setModalIsOpen, setSelectedMessage } = useContext(CardContext);
  const { userInfo } = React.useContext(SessionProviderContext) as any;
  const { selectedRadioButtonMessages } =
    React.useContext(MessageExportContext);

  const router = useRouter();
  const handlerOpenModal = (row: any) => {
    setSelectedMessage(row);
    setModalIsOpen(true);
  };

  const checkDisabledSent = () => {
    if (!userInfo?.permissions?.sendMessage) return true;
    if (["678", "679"].includes(messageCode)) {
      return selectedRadioButtonMessages !== id;
    }
    return false;
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
          key={`drive-icon-${id}`}
          style={{
            padding: 0,
            color: userInfo?.permissions?.signMortgageDischarge
              ? "#00B2E2"
              : "#CCC",
            margin: 2,
          }}
          disabled={!userInfo?.permissions?.signMortgageDischarge}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}`
            )
          }
        >
          <DriveFileRenameOutlineIcon />
        </IconButton>
      )}
      {actions.includes("sent") && (
        <IconButton
          key={`sent-icon-${id}`}
          style={{
            padding: 0,
            color: checkDisabledSent() ? "#CCC" : "#00B2E2",
            margin: 2,
          }}
          disabled={checkDisabledSent()}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}&cukCode=${cukCode}`
            )
          }
        >
          <SendOutlinedIcon />
        </IconButton>
      )}
      {actions.includes("details") && (
        <IconButton
          key={`detail-icon-${id}`}
          style={{ padding: 0, color: "#565656", margin: 2 }}
          onClick={() => handlerOpenModal(row)}
          disabled={!userInfo.permissions.sendMessage}
        >
          <InfoOutlinedIcon />
        </IconButton>
      )}
      {messageCode === "670" && status === "01" && (
        <IconButton
          key={`edit-icon-${id}`}
          style={{
            padding: 0,
            color: actions.includes("edit") ? "#00B2E2" : "#565656",
            margin: 2,
          }}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}`
            )
          }
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
    const { documents = [] } = row || {};
    if (documents?.length > 0) {
      const handleClick = () => {
        documents.forEach((file: any) => {
          const blob = base64ToBlob(file.content);
          downloadFile(blob, file.documentName);
        });
      };
      return (
        <Link href="#" onClick={handleClick}>
          {documents?.length}
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
