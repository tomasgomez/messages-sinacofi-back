import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";
import { IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { SessionProviderContext } from "@/context/SessionProvider";
import { useContext } from "react";

const AccionesColumn = ({ row }: { row: any }) => {
  const { id = "" } = row || {};
  const { userInfo } = useContext(SessionProviderContext) as any;

  const handlerOpenModal = (row: any) => {};
  const handlerOpenModalTracking = (row: any) => {};

  const iconButtonStyle = { padding: 0, margin: "0px 2px" };
  const disabledColor = "#CCC";
  const defaultColor = "#565656";

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Tooltip
        title={
          userInfo?.permissions?.sendMessage
            ? ""
            : "No tienes permisos para realizar esta acción."
        }
      >
        <span>
          <IconButton
            key={`detail-icon-${id}`}
            style={{
              ...iconButtonStyle,
              color: userInfo?.permissions?.sendMessage
                ? defaultColor
                : disabledColor,
            }}
            onClick={() => handlerOpenModal(row)}
            disabled={!userInfo?.permissions?.sendMessage}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <IconButton
        key={`tracking-icon-${id}`}
        style={{
          ...iconButtonStyle,
          color: defaultColor,
        }}
        onClick={() => handlerOpenModalTracking(row)}
      >
        <TrackChangesIcon />
      </IconButton>
    </div>
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

export const columnsSearch: Columns[] = [
  {
    id: "NSR",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha de Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "OSN",
    align: Alignment.LEFT,
    sortable: false,
  },
  actions,
];

export const rowOptions: RowOptions = {
  NSR: {
    align: Alignment.CENTER,
  },
};
