/*
 * Interface representing a message.
 */
export interface IMessage {
    id?: number;
    TSN: string;
    OSN: string;
    NSE: string;
    messageCode: string;
    destination: string;
    description: string;
    priority: string;
    status: string;
    sender: string;
    creationDate: string;
    creationTime: string;
    receiver: string;
    receivedDate: string;
    receivedTime: string;
    actions: string;
    documents: string;
    parameters: any;
}
