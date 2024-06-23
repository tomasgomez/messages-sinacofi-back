import { Status } from "./codes";

export interface Filter{
  cukCode ? : string[]; 
  id ? : string[]; 
  name ? : string[];
  description ? : string[];
  startDate ? : Date; 
  endDate ? : Date;  
  channel ? : string[]; 
  region ? : string[] | null; 
  messageCode ? : string[]; 
  buyerDni ? : string[]; 
  buyer ? : string[]; 
  ownerDni ? : string[]; 
  owner ? : string[];  
  sellerDni ? : string[];
  seller ? : string[];
  borrowerDni ? : string[]; // debtorDni
  borrower ? : string[];
  messageStatus ? : string[]; 
  institutionCode ? : string[];
  institutionDestination ? : string[];
  count ? : string; 
  offset ? : string; 
  status ? : string[];
  statusCategory ? : string[]; 
  notary ? : string[];
  repertoireDate ? : string[];
  include?:{
    documents?: boolean;
    parameters?: boolean;
  }
}