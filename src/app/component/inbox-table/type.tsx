export interface Message {
  id: string;
  TSN?: number;
  OSN?: number;
  NSE?: number;
  NSR?: number;
  NSQ?: number;
  LSN?: number;
  messageCode: string;
  destination?: string;
  description: string;
  priority?: string;
  status: string;
  origin: string;
  creationDate: string;
  creationTime: string;
  receivedDate: string;
  receivedTime: string;
  destinationArea?: string;
  originArea?: string;
  cukCode?: string;
  documents?: any[];
  actions?: any[];
  parameters?: any[];
}

export interface SentData {
  id: string;
  TSN?: number;
  OSN?: number;
  NSE?: number;
  NSR?: number;
  NSQ?: number;
  LSN?: number;
  messageCode: string;
  destination?: string;
  description: string;
  priority?: string;
  status: string;
  stateProgress?: string;
  sender: string;
  creationDate: string;
  creationTime: string;
  receiver?: string;
  receivedDate: string;
  receivedTime: string;
  documents?: any[];
  actions?: any[];
  parameters?: any[];
}

export interface MortgageDischargeData {
  id: string;
  name: string;
  cukCode: string;
  description: string;
  status: string;
  creationDate: string;
  foreclosureDate: string;
  channel: string;
  institutionDestination: string;
  region?: string;
  createdAt: string;
  updatedAt: string;
  institutionCode: string;
  ownerDni: string;
  owner: string;
  buyerDni: string;
  buyer: string;
  borrowerDni: string;
  borrower: string;
  history: any[];
  messages: Message[];
}

export interface TrackingModalData {
  status: string;
  date: string;
}

export type KeyOfData =
  | keyof Message
  | keyof SentData
  | keyof MortgageDischargeData
  | keyof TrackingModalData;

export type Order = "asc" | "desc";

export interface Columns {
  id: KeyOfData;
  label: string;
  align?: Alignment;
  render?: any;
  sortable?: boolean;
  withCheckboxAll?: boolean;
  style?: any;
}

export interface RowOptions {
  [key: string]: Options;
}

interface Options {
  align?: Alignment;
  style?: any;
}

export enum Alignment {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: KeyOfData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy?: string;
  rowCount: number;
  withCheckboxAll?: boolean;
  columns?: Columns[];
  noExtraColumn?: boolean;
  isExpansible?: boolean;
}

export interface TableProps {
  withCheckbox?: boolean;
  labelId: string;
  row: Message | any;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
  columns: Columns[];
  highlightLastRow?: boolean;
  highlightWithBorderLeft?: boolean;
  isLastRow?: boolean;
  isExpansible?: boolean;
  rowOptions?: RowOptions;
}

export interface MSDetail {
  id: string;
  TSN: string;
  OSN: string;
  NSE: string;
  messageCode: string;
  destination: string;
  description: string;
  priority: string;
  status: string;
  sender: string;
  creationDate: string;
  creationTime: string;
  receiver: string;
  receivedDate: string;
  receivedTime: string;
  parameters: MSParameter[];
}

export interface MSParameter {
  id: string;
  name: string;
  label: string;
  type: string;
  description: string;
  placeholder: string;
  value: string;
  validations: {
    required: boolean;
    maxLength: number;
    minLength: number;
  };
}
