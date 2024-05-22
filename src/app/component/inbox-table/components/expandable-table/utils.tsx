import { linkAndLabel, StatusMessage, DataExpandable } from "./type";
import Link from "@mui/material/Link";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SendIcon from "@mui/icons-material/Send";

export const LabelLink = (props: linkAndLabel | undefined) => {
  if (props === undefined) return "-";

  const { label, link } = props;

  if (label === 0) return "-";

  return link ? (
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("the label is: " + label);
      }}
      style={{ color: "#00B2E2" }}
    >
      {label}
    </Link>
  ) : (
    label
  );
};

export const getState = (state?: StatusMessage) => {
  // actions for now
  switch (state) {
    case StatusMessage.RECEIVED:
      return "Recibido";
    case StatusMessage.SENT:
      return "Enviado";
    case StatusMessage.PENDING:
      return "Pendiente";
    default:
      return "-";
  }
};

export const getItem = (
  rowExpandableTable: DataExpandable[],
  index: number,
  state?: StatusMessage
) => {
  // actions for now
  switch (state) {
    case StatusMessage.RECEIVED:
      return <MarkEmailReadIcon style={{ color: "#0C2093" }} />;
    case StatusMessage.SENT:
      return <ForwardToInboxIcon style={{ color: "#00B2E2" }} />;
    case StatusMessage.PENDING:
      if (
        index === 0 ||
        rowExpandableTable[index - 1].state !== StatusMessage.PENDING
      )
        return <SendIcon style={{ color: "#898989" }} />;
      return <ErrorOutlineIcon style={{ color: "#898989" }} />;
    default:
      return <ErrorOutlineIcon style={{ color: "#898989" }} />;
  }
};
