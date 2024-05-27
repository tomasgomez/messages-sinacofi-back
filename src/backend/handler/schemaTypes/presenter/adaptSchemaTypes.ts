import { Schema } from "@/backend/entities/schema/message";

// Function to adapt data to Schema type
export function adaptSchemaTypes(dataToAdapt: any): Schema[] {

    const schemas: Schema[] = [];

    // Check if data is not empty and is an array
    if (dataToAdapt instanceof Array && dataToAdapt.length > 0) {

        // Iterate through each item in the data array
        for (const schema of dataToAdapt) {

            // Destructure properties from schema object
            const { messageCode, description, name } = schema;

            // Check if required properties exist
            if (messageCode && description && name) {

                // Create a new Schema object and push it to the schemas array
                schemas.push({ messageCode, description, name });
            }
        }
    }

    return schemas;
}
