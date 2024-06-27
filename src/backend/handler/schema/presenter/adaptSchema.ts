import { ButtonSchema } from "@/backend/entities/schema/interface";
import { MessageSchemaFront, Parameter, Validations } from "@/backend/entities/schema/messageSchema";

// Function to adapt data to Schema type
export function adaptSchema(dataToAdapt: any, userData: any): MessageSchemaFront {
    const schema: MessageSchemaFront = new MessageSchemaFront();

    if (dataToAdapt) {
        schema.id = dataToAdapt.id;
        schema.messageCode = dataToAdapt.messageCode;
        schema.description = dataToAdapt.description;
        schema.name = dataToAdapt.name;
        schema.createdAt = dataToAdapt.createdAt;
        schema.updatedAt = dataToAdapt.updatedAt;
    }
    // check buttons and assign buttons && modals
    if (dataToAdapt.allowedActions && dataToAdapt.allowedActions.length > 0){
        // get the first value 
        const actionAllowed = dataToAdapt.allowedActions[0].values;
        // check if buttons exists
        if (actionAllowed.buttons && actionAllowed.length > 0){
            let buttons = actionAllowed.buttons.map((button: any) => {
                return {
                    name:button.name,
                    disabled:button.disabled,
                    action:button.action,
                    text: button.text
                }
            });
            schema.actions = schema.actions ?? {};
            schema.actions.buttons = buttons;
        }
        // check if modal exists
        if (actionAllowed.modal){
            let modal = { name: actionAllowed.modal.name, type: actionAllowed.modal.type }
            schema.actions = schema.actions ?? {};
            schema.actions.modal = modal;
        }
    }
    if (dataToAdapt.allowedActions && dataToAdapt.allowedActions[0] && dataToAdapt.allowedActions[0].values.buttons && dataToAdapt.allowedActions[0].values.buttons.length > 0){ 
        let buttons = dataToAdapt.allowedActions[0].values.buttons.map((button: any) => {
            return {
                name:button.name,
                disabled:button.disabled,
                action:button.action,
                text: button.text
            }
        })

        schema.actions = schema.actions ?? {};
        schema.actions.buttons = buttons;
    }
    
    const newParameters: Parameter[] = extractParameters(dataToAdapt, userData);
    
    schema.parameters = newParameters;
    
    return schema;
}

// Extract parameters from dataToAdapt
function extractParameters(dataToAdapt: any, userData: any): Parameter[] {
    const parameters: any[] = dataToAdapt?.parameters || [];
    const sortedParameters = sortParametersByPriority(parameters);

    const adaptedParameters = sortedParameters.map((parameter: any) => adaptParameter(parameter, userData));
    let filterParams: any[]= [];
    const finalParameters = adaptedParameters.map((parameter) => {
        if (parameter.type === "accordion") {
            if (parameter.defaultValue === "") {
                parameter.parameters = [];
                return parameter;
            }
            // const parameterChildren = parameter.defaultValue.split(",").map((el) => ({ [el]: true }));
            const parameterChildren = parameter.defaultValue.split(",");
            parameter.parameters = parameterChildren.map((child: any) => adaptedParameters.find(el => el.id === child));
            filterParams = [...filterParams, ...parameterChildren];
        }
        return parameter;
    })

    if (filterParams.length > 0) {
        return finalParameters.filter((param) => !filterParams.includes(param.id));
    }
    return finalParameters;
}

// Sort parameters by priority in ascending order
function sortParametersByPriority(parameters: any[]): any[] {
    return parameters.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0));
}

function getDefaultValue(defaultValue: any, userData: { senderId?: any, receiverId?: any, sender?: any, name?: any } = {}) {
    if (defaultValue === "Current Date" || defaultValue === "currentDate") {
        return new Date();
    }
    if (defaultValue === "userInstitution") {
        return userData?.sender?.name;
    }
    if (defaultValue === "receiverId") {
        return userData?.receiverId;
    }
    return defaultValue;
}

// Adapt parameter object
function adaptParameter(parameter: any, userData: any): Parameter {
    let { name, messageCode, label, type, placeholder, priority, rules, optionValues, row, column, defaultValue } = parameter;
    const multiple = optionValues && optionValues.length > 0;
    const validations: Validations = extractValidations(rules);

    if (name == 'authname') {
       defaultValue = userData.name;
    }

    return {
        id: name,
        messageCode,
        label,
        type,
        defaultValue: getDefaultValue(defaultValue, userData),
        priority,
        description: "",
        placeholder,
        properties: {
            "rows": row,
            "columns": column,
            ...((type === "select" || type == 'checkbox' ) ? { "multiple": multiple,"options": optionValues } : {}),
            ...(validations?.disabled ? { disabled: true } : {})
        },
        validations
    };
}

// Extract validations from rules array
function extractValidations(rules: any[]): Validations {
    const validations: Validations = {};

    if (rules) {
        rules.forEach((rule: any) => {
            if (rule.condition && rule.value) {
                const ruleCondition = rule.condition.replace(/\d+$/, ''); // Remove numbers from the end of the rule name

            if (rule.value == 'true' ) {
                rule.value = true;
            } else if (rule.value == 'false') {
                rule.value = false;
            }
                
            validations[ruleCondition] = rule.value;
            }
        });
    }


    return validations;
}