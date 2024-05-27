export interface Filter{
  cukCode ? : string[];
  
  id ? : string[];
  name ? : string[];
  description ? : string[];
  startDate ? : Date;
  endDate ? : Date;
  channel ? : string[];
  status ? : string[];
  region ? : string[] | null;
  mesageCode ? : string[];
  buyerDni ? : string[];
  buyer ? : string[];
  ownerDni ? : string[];
  owner ? : string[];
  borrowerDni ? : string[];
  borrower ? : string[];
  messageStatus ? : string[];
  institutionCode ? : string[];
  institutionDestination ? : string[];


  count ? : string;
  offset ? : string;
}