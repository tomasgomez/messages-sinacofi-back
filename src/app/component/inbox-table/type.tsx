export interface Data {
  id: number;
  osn?: number;
  tsn?: number;
  ms: number;
  message: string;
  institution: string;
  date: string;
  time: string;
  state: number;
  stateProgress: string;
  dateSent: string;
  timeSent:string;
  nse:string;
  actions?:boolean
}
export interface SentData {
  id: number;
  tsn: number;
  ms: number;
  message: string;
  institution: string;
  date: string;
  time: string;
  state: number;
  stateProgress: string;
  dateSent: string;
  timeSent:string;
  nse:string;
  actions:boolean;
}

export type KeyOfData=keyof Data | keyof SentData



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
