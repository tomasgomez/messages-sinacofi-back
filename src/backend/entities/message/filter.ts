import { Parameter } from "./parameter";

export interface FilterMessage {
  [key: string]: unknown ;

  id ? : string[]
  messageCode ? : string[]
  origin ? : string[]
  destination ? : string[]
  originArea ? : string[]
  destinationArea ? : string[]
  creationDate ? : string[]
  creationTime ? : string[]
  receivedDate ? : string[]
  receivedTime ? : string[]
  actions ? : string[]
  createdAt ? : Date
  updatedAt ? : Date
  statusId ? : string[]
  cukCode ? : string[]

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