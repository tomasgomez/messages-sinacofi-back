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
    name: string | null;
    messageCode?: string | null;
    label?: string | null;
    type?: string | null;
    placeholder?: string | null;
    description?: string | null;
    defaultValue?: string | null;
    priority?: number | null;
    value?: string | null;
    properties?: any | null;
    validations?: any | null;
    messageId?:string | null;
}

export interface Documents {
    id?: string;
    documentName?: string | null;
    content?: string | null;
    url?: string | null;
    messageId?: string | null;
}
