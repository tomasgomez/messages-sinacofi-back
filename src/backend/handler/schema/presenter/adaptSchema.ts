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
            const parameterChildren = adaptedParameters.map((param: any) => {
                console.log(param.validations)
                if (param.validations){
                    console.log(param.validations.condition)
                    console.log(param.validations.value)
                    console.log(parameter.id)
                    
                    if ('accordion' in param.validations && param.validations['accordion'] == parameter.id){
                        console.log(param)
                        return param
                    }
                    
                }
            })

            console.log(parameterChildren)

            // const parameterChildren = parameter.defaultValue.split(",").map((el) => ({ [el]: true }));
            // const parameterChildren = parameter.defaultValue.split(",");
            // parameter.parameters = parameterChildren.map((child: any) => adaptedParameters.find(el => el.id === child));
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

function getDefaultValue(defaultValue: any, userData: { senderId?: any, receiverId?: any, sender?: any } = {}) {
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
    const { name, messageCode, label, type, placeholder, priority, rules, optionValues, row, column, defaultValue } = parameter;
    const multiple = optionValues && optionValues.length > 0;
    const validations: Validations = extractValidations(rules);

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