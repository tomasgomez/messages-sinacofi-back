
class Parameter {
    id: string;
    name: string;
    label: string;
    type: string;
    description: string;
    placeholder: string;
    value: string;
    validations: Validation;
    
        constructor(id: string, name: string, label: string, type: string, description: string, placeholder: string, value: string, validations: Validation) {
            this.id = id;
            this.name = name;
            this.label = label;
            this.type = type;
            this.description = description;
            this.placeholder = placeholder;
            this.value = value;
            this.validations = validations;
        }
}
