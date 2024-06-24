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
import { CardContext } from "../store/ModalStore";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { base64ToBlob, downloadFile } from "../../utils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SessionProviderContext } from "@/context/SessionProvider";
import { MessageExportContext } from "@/app/component/MessageExportProvider";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import Tooltip from "@mui/material/Tooltip";

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
  const { userInfo } = useContext(SessionProviderContext) as any;
  const { setPrintPDF, setSelectedMessages, selectedRadioButtonMessages } =
    useContext(MessageExportContext);
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

  const handleActionPrint = async (id: string) => {
    setSelectedMessages([id]);
    setPrintPDF(true);
  };

  const iconButtonStyle = { padding: 0, margin: "0px 2px" };
  const disabledColor = "#CCC";
  const enabledColor = "#00B2E2";
  const defaultColor = "#565656";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {actions.includes("SIGN") && messageCode === "670" && (
        <Tooltip
          title={
            userInfo.permissions.signMortgageDischarge
              ? ""
              : "No tienes permisos para realizar esta acción."
          }
        >
          <span>
            <IconButton
              key={`drive-icon-${id}`}
              style={{
                ...iconButtonStyle,
                color: userInfo?.permissions?.signMortgageDischarge
                  ? enabledColor
                  : disabledColor,
              }}
              disabled={!userInfo?.permissions?.signMortgageDischarge}
              onClick={() =>
                router.push(
                  `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}&cukCode=${cukCode}&action=sign`
                )
              }
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {actions.includes("SIGN") && messageCode !== "670" && (
        <Tooltip
          title={
            userInfo.permissions.sendMessage
              ? ""
              : "No tienes permisos para realizar esta acción."
          }
        >
          <span>
            <IconButton
              key={`sent-icon-${id}`}
              style={{
                ...iconButtonStyle,
                color: checkDisabledSent() ? disabledColor : enabledColor,
              }}
              disabled={checkDisabledSent()}
              onClick={() =>
                router.push(
                  `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}&cukCode=${cukCode}&action=sent`
                )
              }
            >
            <SendOutlinedIcon />
          </IconButton>
          </span>
        </Tooltip>
      )}
      {actions.includes("SHOW_DETAIL") && (
        <Tooltip
          title={
            userInfo.permissions.sendMessage
              ? ""
              : "No tienes permisos para realizar esta acción."
          }
        >
          <span>
            <IconButton
              key={`detail-icon-${id}`}
              style={{
                ...iconButtonStyle,
                color: userInfo.permissions.sendMessage
                  ? defaultColor
                  : disabledColor,
              }}
              onClick={() => handlerOpenModal(row)}
              disabled={!userInfo.permissions.sendMessage}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {actions.includes("PRINT") && (
        <IconButton
          key={`print-icon-${id}`}
          style={{
            ...iconButtonStyle,
            color: defaultColor,
          }}
          onClick={() => handleActionPrint(id)}
        >
          <LocalPrintshopOutlinedIcon />
        </IconButton>
      )}
      {actions.includes("EDIT") && (
        <IconButton
          key={`edit-icon-${id}`}
          style={{
            ...iconButtonStyle,
            color: defaultColor,
          }}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}&cukCode=${cukCode}&action=edit`
            )
          }
        >
          <EditOutlinedIcon />
        </IconButton>
      )}
      {actions.includes("DUPLICATE") && (
        <IconButton
          key={`edit-icon-${id}`}
          style={{
            ...iconButtonStyle,
            color: enabledColor,
          }}
          onClick={() =>
            router.push(
              `/messages/create?institutionId=${destination}&messageCode=${messageCode}&messageId=${id}&cukCode=${cukCode}&action=duplicate`
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
