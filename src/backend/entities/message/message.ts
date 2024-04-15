export class Message {
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

    constructor() {
        this.TSN = '';
        this.OSN = '';
        this.NSE = '';
        this.messageCode = '';
        this.destination = '';
        this.description = '';
        this.priority = '';
        this.status = '';
        this.sender = '';
        this.creationDate = '';
        this.creationTime = '';
        this.receiver = '';
        this.receivedDate = '';
        this.receivedTime = '';
        this.actions = '';
        this.documents = '';
        this.parameters = [];
    }
}