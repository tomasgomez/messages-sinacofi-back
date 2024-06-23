import { Methods } from "../calls/http";

export interface IMessageSchema {
    id?: string;
    messageCode?: string;
    description?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    parameters?: any[];
    actions?: SchemaAction
}

export type SchemaAction = {
    buttons: ButtonSchema[],
    modal?: ModalSchema
}

type ButtonSchema = {
    name: string,
    disabled: boolean,
    action: ButtonAction
}

type ModalSchema = {
    title: string,
    body: string
}


type ButtonAction = {
    url: string,
    method: Methods
}

