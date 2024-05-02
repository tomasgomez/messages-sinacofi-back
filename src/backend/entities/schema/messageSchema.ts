import { IMessageSchema } from "./interface";

export class MessageSchema implements IMessageSchema {
   
    constructor(
        public id: string,
        public messageCode: string,
        public description: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public parameters?: any[]
    ) {}
}
export class MessageSchemaFront implements IMessageSchema {
   
    constructor(
        public id: string,
        public messageCode: string,
        public description: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public parameters?: any[]
    ) {}
}

