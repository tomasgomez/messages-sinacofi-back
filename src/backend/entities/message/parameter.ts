import { Properties } from "./properties";

export type Parameter = {
    id: string;
    name: string;
    messageCode ? : string | null;
    label ? : string | null;
    type ? : string | null;
    placeholder ? : string | null;
    description ? : string | null;
    defaultValue ? : string | null;
    priority : number;
    value ? : string | null;

    validations ? : string | null;

    propertyId ? : string | null;
    messageId? : string;
    cukCode ? : string | null;
    properties ? : Properties | null;
}