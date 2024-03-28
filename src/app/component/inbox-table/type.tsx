export interface Data {
  id: string;
  OSN?: string;
  TSN?: string;
  NSR? : string;
  NSQ?: string;
  destination?: string;
  messageCode: string;
  documents: string;
  description: string;
  receiver: string;
  priority: string;
  sender: string;
  creationDate: string;
  creationTime: string;
  status: string;
  stateProgress?: string;
  receivedDate: string;
  receivedTime:string;
  NSE?:string;
  actions?:boolean | string;
}

export interface SentData {
  id: number;
  OSN?: string;
  TSN?: string;
  NSR? : string;
  NSQ?: string;
  destination?: string;
  messageCode: string;
  documents: string;
  description: string;
  receiver: string;
  priority: string;
  sender: string;
  creationDate: string;
  creationTime: string;
  status: string;
  stateProgress?: string;
  receivedDate: string;
  receivedTime:string;
  NSE?:string;
  actions?:boolean | string;
}

export type KeyOfData= keyof Data | keyof SentData



export type Order = "asc" | "desc";

export interface Columns {
  id: KeyOfData
  label: string;
  align: Alignment;
}

export interface RowOptions {
  [key: string]: Options;
}

interface Options {
  maxwidth?: number;
  minwidth?: number;
  isBlod?: boolean;
  align?: Alignment;
  fontSize?: number;
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
  orderBy: string;
  rowCount: number;
  withCheckboxAll?: boolean;
  columns?:Columns[]
}

export interface TableProps {
  withCheckbox?: boolean;
  labelId: string;
  row: Data | any;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
}
