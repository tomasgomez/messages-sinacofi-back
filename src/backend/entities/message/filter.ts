import { Parameter } from "./parameter";

export interface FilterMessage {
  [key: string]: unknown ;

  id ? : string[]
  messageCode ? : string[]
  status ? : string[]
  cukCode ? : string[]
  origin ? : string[]
  destination ? : string[]
  originArea ? : string[]
  destinationArea ? : string[]
  startDate ? : Date
  endDate ? : Date
  actions ? : string[]
  createdAt ? : Date
  updatedAt ? : Date

  detail: boolean ;

  parameters ? : Parameter[];

  count ? : string;
  offset ? : string;
}

export interface FilterParameter {
  [key: string]: unknown;

  id ? : string[]
  name ? : string[]
  messageCode ? : string[]
  messageId ? : string[]
}