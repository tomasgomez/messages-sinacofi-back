export interface FilterMessage {
  [key: string]: string | string[] | Date | undefined | null;

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

  count ? : string;
  offset ? : string;
}