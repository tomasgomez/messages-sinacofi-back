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
    actions?: string | null;
    documents?: string | null;
    parameters?: any;
}