import { Methods } from "../calls/http";

export interface IMessageSchema {
    id?: string;
    messageCode?: string;
    description?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    parameters?: any[];
    allowedActions?: SchemaAction
}

export type SchemaAction = {
    buttons?: ButtonSchema[],
    modal?: ModalSchema
}

export type ButtonSchema = {
    text?: string,
    name?: string,
    disabled?: boolean,
    action?: string
}

export type ModalSchema = {
    title?: string,
    body?: string,
    name?: string,
    type?: string
}






