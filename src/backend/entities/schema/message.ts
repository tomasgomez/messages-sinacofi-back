// schema.entity.ts
export interface Schema {
    id: number;                 // Unique identifier for the form
    messageCode: string;        // Message code associated with the form
    description: string;        // Description of the form schema
    name: string;               // Name of the form
    createdAt: Date;            // Date and time the form was created
    updatedAt: Date;            // Date and time the form was last updated
  }
  
  // parameters.entity.ts
  export interface Parameter {
    id: number;                           // Unique identifier for the form field
    schemaId: number;                       // ID of the schema this field belongs to
    description: string;                  // Description of the parameter
    row?: number;                         // Width of the field in pixels (optional)
    column?: number;                      // Height of the field in pixels (optional)
    defaultValue?: string;                // Default value for the field (optional)
    validationRule: Record<string, any>;  // Validation rule for the field (e.g., { required: true, minLength: 5 })
    priority: number;                     // Order of the field in the form
  }
  
  // fields.entity.ts
  export interface Field {
    id: number;                 // Unique identifier for the form field
    label: string;              // Label displayed for the field
    description: string;        // Description of the field
    type: string;               // Type of the field (e.g., "text", "number", "select", "checkbox")
    placeholder: string;        // Placeholder displayed for the field
  }
  
  // parameter-options.entity.ts
  export interface ParameterOption {
    id: number;                 // Unique identifier for the field option
    parameterId: number;        // ID of the parameter this option belongs to
    description: string;        // Description of the field option
    value: string;              // Value of the option
    label: string;              // Label displayed for the option
  }
  
  export interface MessageParameterValue {
    parameterId: number;        // ID of the parameter this value belongs to
    messageId?: number;         // ID of the message this value belongs to
    value: string;              // Value submitted for the field
  }
  
  // statuses.entity.ts
  export interface Status {
    id: number;                 // Unique identifier for the status data entry
    messageId: number;          // ID of the message (message data) this status belongs to
    createdAt: Date;            // Date and time the status data was submitted
    updatedAt: Date;            // Date and time the status data was updated
    userId: string;             // User ID associated with the status
    value: string;              // Value of the status
  }
