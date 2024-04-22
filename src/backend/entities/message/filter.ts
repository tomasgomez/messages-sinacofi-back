export interface MessageFilter {
    CUK?: string;
    messageCode?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    receiver?: string;
    clientDni?: string;
    sellerDni?: string;
    payerDni?: string;
    region?: string;
    count?: string;
    offset?: string;
  }