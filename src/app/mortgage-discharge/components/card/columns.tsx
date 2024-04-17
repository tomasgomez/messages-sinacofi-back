"use client";

import { useContext } from "react";
import { Columns, Alignment } from "@/app/component/inbox-table/type";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Box, IconButton } from "@mui/material";
import { ModalContext } from "../../in-process/store/ModalStore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const acciones: Columns = {
  id: "actions",
  label: "Acciones",
  align: Alignment.CENTER,
  render: ({ row }: { row: any }) => {
    // TODO: uncomment this line to open the modal
    // const { setIsOpen } = useContext(ModalContext);

    const handlerOpenModal = () => {
      // TODO: uncomment this line to open the modal
      // setIsOpen(true);
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          key={`drive-icon-${row.id}`}
          aria-label="DriveFileRenameOutlineIcon"
          style={{ padding: 0, color: "#00B2E2" }}
        >
          <DriveFileRenameOutlineIcon />
        </IconButton>
        {/* Detail Icon */}
        {/* <IconButton
          key={`detail-icon-${row.id}`}
          aria-label="DetailOutlineIcon"
          style={{ padding: 0, color: "#565656" }}
          onClick={handlerOpenModal}
        >
          <ErrorOutlineIcon />
        </IconButton> */}
      </Box>
    );
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
    id: "code",
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
    id: "date",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "time",
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
  {
    id: "attachments",
    label: "Adjuntos",
    align: Alignment.LEFT,
    sortable: false,
  },
  acciones,
];
