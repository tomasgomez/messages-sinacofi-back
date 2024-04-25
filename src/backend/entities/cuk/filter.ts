export interface Filter {
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
  institutionDestination ? : string[];

  count ? : string;
  offset ? : string;
}