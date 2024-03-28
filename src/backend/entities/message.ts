
class Message {
    id: string;
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
    parameters: Parameter[];
    
        constructor(id: string, TSN: string, OSN: string, NSE: string, messageCode: string, destination: string, description: string, priority: string, status: string, sender: string, creationDate: string, creationTime: string, receiver: string, receivedDate: string, receivedTime: string, parameters: Parameter[]) {
            this.id = id;
            this.TSN = TSN;
            this.OSN = OSN;
            this.NSE = NSE;
            this.messageCode = messageCode;
            this.destination = destination;
            this.description = description;
            this.priority = priority;
            this.status = status;
            this.sender = sender;
            this.creationDate = creationDate;
            this.creationTime = creationTime;
            this.receiver = receiver;
            this.receivedDate = receivedDate;
            this.receivedTime = receivedTime;
            this.parameters = parameters;
        }
}
