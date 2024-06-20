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
  origin: string;
  creationDate: string;
  creationTime: string;
  receivedDate: string;
  receivedTime: string;
  documents?: any[];
  actions?: any[];
  parameters?: any[];
}

export interface HistoryTrackingModal {
  id: string;
  cukCode: string;
  status: string;
  date: string;
}
export interface MortgageDischargeData {
  id?: string;
  name?: string;
  cukCode?: string;
  description?: string;
  status?: string;
  creationDate?: string;
  foreclosureDate?: string;
  channel?: string;
  institutionDestination?: string;
  region?: string;
  createdAt?: string;
  updatedAt?: string;
  institutionCode?: string;
  ownerDni?: string;
  owner?: string;
  buyerDni?: string;
  buyer?: string;
  borrowerDni?: string;
  borrower?: string;
  history?: HistoryTrackingModal[];
  messages?: Message[];
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
  id: KeyOfData | string;
  label: string;
  align?: Alignment;
  render?: any;
  sortable?: boolean;
  withCheckboxAll?: boolean;
  style?: any;
  withRadiuButton?: boolean;
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
    property: KeyOfData | string,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy?: string;
  rowCount: number;
  withCheckboxAll?: boolean;
  columns?: Columns[];
  noExtraColumn?: boolean;
  isExpansible?: boolean;
  withRadioButton?: boolean;
}

export interface TableProps {
  highlightRowDisabled?: boolean;
  withCheckbox?: boolean;
  withRadioButton?: boolean;
  showColumnToRadioButton?: boolean;
  labelId: string;
  row: Message;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number | string) => void;
  handleRadioClick: (
    event: React.MouseEvent<unknown>,
    id: number | string
  ) => void;
  columns: Columns[];
  highlightLastRow?: boolean;
  highlightWithBorderLeft?: boolean;
  isLastRow?: boolean;
  isExpansible?: boolean;
  rowOptions?: RowOptions;
  selectedRadioButton?: string | number | null;
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
