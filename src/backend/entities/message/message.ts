import { IMessage } from './interface';

export class Message implements IMessage{

    constructor(
        public TSN: string,
        public OSN: string,
        public NSE: string,
        public messageCode: string,
        public destination: string,
        public description: string,
        public priority: string,
        public status: string,
        public sender: string,
        public creationDate: string,
        public creationTime: string,
        public receiver: string,
        public receivedDate: string,
        public receivedTime: string,
        public actions: string,
        public documents: string,
        public parameters: any
    ) {}

    setParameters(parameters: any) {
        this.parameters = parameters;
    }
}