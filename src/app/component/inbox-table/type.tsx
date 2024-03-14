export interface Data {
  id: number;
  osn: number;
  ms: number;
  message: string;
  institution: string;
  date: string;
  time: string;
  state: number;
  stateProgress: string;
}

export type Order = "asc" | "desc";

export interface Columns {
  id: keyof Data;
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
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  withCheckboxAll?: boolean;
}

export interface TableProps {
  withCheckbox?: boolean;
  labelId: string;
  row: Data;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
}
