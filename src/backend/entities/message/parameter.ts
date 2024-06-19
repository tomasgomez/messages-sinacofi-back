import { Properties } from "./properties";
import { Message } from "./message";

export type Parameter = {
    id ? : string;
    name: string;
    messageCode ? : string | null;
    label ? : string | null;
    type ? : string | null;
    placeholder ? : string | null;
    description ? : string | null;
    defaultValue ? : string | null;
    priority : number;
    value ? : string | null;
    displayValue ? : string | null;

    validations ? : string | null;

    propertyId ? : string | null;
    messageId? : string;
    cukCode ? : string | null;
    properties ? : Properties | null;
}



export function adaptParameters(message: Message, messageSchema: any): any {
    return message.parameters?.map((parameter: Parameter) => {
        parameter.displayValue = parameter.value;

        if (messageSchema.parameters === undefined || messageSchema.parameters.length === 0) {
            return parameter;
        }

        let schema = messageSchema.parameters?.find((schema: any) => schema.name === parameter.name);
    
        if (schema === undefined) {
            return parameter;
        }

        if (schema.optionValues !== undefined && schema.optionValues.length > 0) {
            let optionValue = schema.optionValues.find((option: any) => option.value === parameter.value);
            if (optionValue === undefined) {
                return parameter;
            }
            
            return {
                ...parameter,
                label: schema.label,
                displayValue: optionValue.label,
            }
        }
    
        return {
            ...parameter,
            label: schema.label,
        }
    });
}