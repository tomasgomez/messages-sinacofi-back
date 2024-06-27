import { IMessageSchema, SchemaAction } from "./interface";

export class MessageSchema implements IMessageSchema {
   
    constructor(
        public id: string,
        public messageCode: string,
        public description: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public parameters?: any[],
        public allowedActions?: SchemaAction
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
        public parameters?: Parameter[],
        public actions?: SchemaAction
    ) {}
}

export interface Parameter {
    id: string;
    messageCode: string;
    label: string;
    type: string;
    defaultValue: string | any;
    priority: number;
    description: string;
    placeholder: string;
    properties: Properties;
    validations: Validations;
    parameters?: Parameter[];
}

export interface Properties {
    [key: string]: string | boolean;
}

export interface Validations {
    [key: string]: string;
}