/*
 * Interface representing a message.
 */
export interface IMessage {
    id?: string;
    TSN ? : number | null;
    OSN ? : number | null;
    NSE ? : number | null;
    LSN ? : number | null;
    NSR ? : number | null;
    messageCode?: string | null;
    description?: string | null;
    priority?: string | null;
    status?: string | null;
    sender?: string | null;
    creationDate?: string | null;
    creationTime?: string | null;
    receiver?: string | null;
    receivedDate?: string | null;
    receivedTime?: string | null;
    cukCode ? : string | null;
    actions?: any;
    documents?: any;
    parameters?: any;
}

export interface Parameter {
    id: string ; 
    name: string;
    messageCode?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    description?: string;
    defaultValue?: string;
    priority?: number;
    value?: string;
    properties?: any;
    validations?: any;
    createdAt?: Date;
    updatedAt?: Date;
    messageId?:string;
}

export interface Documents {
    id?: string;
    documentName?: string | null;
    content?: string | null;
    url?: string | null;
    createdAt?: Date;
    messageId?: string | null;
}
