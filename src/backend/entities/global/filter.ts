export interface Filter {
  [key: string]: string | string[] | Date | undefined | null;

  id ? : string[];
  name ? : string[];
  cukCode ? : string[];
  description ? : string[];
  startDate ? : Date;
  endDate ? : Date;
  channel ? : string[];
  status ? : string[];
  clientDni ? : string[];
  clientName ? : string[];
  rutSeller ? : string[] | null;
  region ? : string[] | null;
  debtorRut ? : string[] | null;

  institutionCode ? : string[];
  institutionDestination ? : string[];


  count ? : string;
  offset ? : string;
}