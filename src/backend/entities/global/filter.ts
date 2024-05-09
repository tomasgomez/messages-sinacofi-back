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
  region ? : string[] | null;

  buyerDni ? : string[];
  buyer ? : string[];
  ownerDni ? : string[];
  owner ? : string[];
  borrowerDni ? : string[];
  borrower ? : string[];

  institutionCode ? : string[];
  institutionDestination ? : string[];


  count ? : string;
  offset ? : string;
}