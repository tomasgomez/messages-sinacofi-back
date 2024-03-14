export interface DataExpandable {
  id: number;
  code: string;
  state: StatusMessage;
  osn?: linkAndLabel;
  datetimeReception?: string;
  nse?: linkAndLabel;
  datetimeSend?: string;
  nsr?: linkAndLabel;
  nsq?: linkAndLabel;
  docs?: linkAndLabel;
}

export type linkAndLabel = {
  label: string | number;
  link?: string;
};

export enum Alignment {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export interface ColumnsDataExpandableTable {
  id: keyof DataExpandable;
  accessor: string;
  label: string;
  align: Alignment;
  fontSize: number;
}

export interface RowOptionsExpandableTable {
  [key: string]: Options;
}

interface Options {
  maxwidth?: number;
  minwidth?: number;
  isBlod?: boolean;
  align?: Alignment;
  fontSize?: number;
}

export enum StatusMessage {
  // actions for now
  SENT = "sent",
  RECEIVED = "received",
  PENDING = "pending",
  /////// Next step
  INBOX = "inbox",
  READY = "ready",
  IN_PROGRESS = "in-progress",
  REJECTED = "rejected",
  RECOVERED = "recovered",
  CRITICAL_MESSAGE = "critical-messages",
}
