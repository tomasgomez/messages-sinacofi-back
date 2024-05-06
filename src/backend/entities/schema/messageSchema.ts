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
        public id?: string,
        public messageCode?: string,
        public description?: string,
        public name?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public parameters?: Parameter[]
    ) {}
}

export interface Parameter {
    id: string;
    messageCode: string;
    label: string;
    type: string;
    defaultValue: string;
    priority: number;
    description: string;
    placeholder: string;
    properties: Properties;
    validations: Validations;
}

export interface Properties {
    [key: string]: string;
}

export interface Validations {
    [key: string]: string;
}