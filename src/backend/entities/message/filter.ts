export interface MessageFilter {
    cukCode?: string[];
    messageCode?: string[];
    status?: string[];
    startDate?: string[];
    endDate?: string[];
    sender?: string[];
    receiver?: string[];
    buyerDni?: string[];
    sellerDni?: string[];
    payerDni?: string[];
    region?: string[];
    count?: string;
    offset?: string;
}