import { Status } from "./codes";

export interface Filter{
  cukCode ? : string[]; // ready/testing
  id ? : string[]; // ready/testing
  name ? : string[]; // ?? refiere a que? name del parameter?
  description ? : string[]; // ready/testing TODO: preguntar si es la descripcion de los parametros (?)
  startDate ? : Date; // ready/testing
  endDate ? : Date;  // ready/testing
  channel ? : string[]; // ready/testing
  region ? : string[] | null; // ready/testing
  messageCode ? : string[]; // ready/testing
  buyerDni ? : string[]; // ready/testing
  buyer ? : string[]; // ready/testing
  ownerDni ? : string[]; // ready/testing
  owner ? : string[];  // ready/testing
  borrowerDni ? : string[]; // ready/testing
  borrower ? : string[];// ready/testing
  messageStatus ? : string[]; // ready/testing
  institutionCode ? : string[]; // revisar filtro
  institutionDestination ? : string[]; // revisar filtro, esta raro con el includes donde se le indica que el messageCode es  ALZAMIENTO_HIPOTECARIO
  count ? : string; // ready/testing
  offset ? : string; // ready/testing
  status ? : string[]; // ready/testing
}