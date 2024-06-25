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
import { MortgageDischargeContext } from "../components/store/ModalStore";

const AccionesColumn = ({ row }: { row: any }) => {
  const { id = "" } = row || {};
  const { userInfo } = useContext(SessionProviderContext) as any;
  const { setModalIsOpen, setSelectedMessage } = useContext(
    MortgageDischargeContext
  );

  const { setIsOpenTrackingModal, setModalTrackingData } = useContext(
    MortgageDischargeContext
  );

  const handlerOpenDetailModal = (row: any) => {
    setSelectedMessage({ id: row.message670ID, cukCode: row.cukCode });
    setModalIsOpen(true);
  };

  const handlerOpenModalTracking = (row: any) => {
    setIsOpenTrackingModal(true);
    setModalTrackingData(row?.modalTrackingData);
  };

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
            onClick={() => handlerOpenDetailModal(row)}
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
    id: "cukCode",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "receivedDate",
    label: "Fecha de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "historyStatus",
    label: "Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "dateHistory",
    label: "Fecha de Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "OSN",
    label: "OSN",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "status670",
    label: "Estado MS670",
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
