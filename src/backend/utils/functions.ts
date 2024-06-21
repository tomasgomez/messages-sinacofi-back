import {
    format
} from 'date-fns';
import {
    Message
} from '../entities/message/message';

export function getEnvVariable(name: string): string | Error {
    try {
        let env = process.env[name];
        if (env) {
            return env;
        } else {
            throw new Error(`Environment variable ${name} not found`);
        }
    } catch (error: any) {
        console.error('Error fetching environment variable:', error);
        return error;
    }
}

export function getChileanTime(): [string, string] | Error {
    try {
        const chileSantiagoDate = new Date().toLocaleString('en-US', {
            timeZone: 'America/Santiago'
        });

        // Parse the date string
        const dateObject = new Date(chileSantiagoDate);

        // Format the date and time components separately
        const creationDate = format(dateObject, 'M/d/yyyy');
        const creationTime = format(dateObject, 'HH:mm:ss');

        return [creationDate, creationTime];

    } catch (error: any) {
        console.error('Error fetching Chilean time:', error);
        return error;
    }
}

// Function to handle null values and empty arrays based on detail flag and specific keys
export function handleNullValues(message: Message): void {

    // Define keys that should be treated as arrays when null
    const arrayKeys: Array<keyof Message> = ['documents', 'parameters', 'status'];

    // Loop through each key-value pair in the message object
    Object.entries(message).forEach(([key, value]) => {
        // If the value is null and the key is one of the array keys, set it to an empty array
        if (value === null && arrayKeys.includes(key as keyof Message)) {
            message[key as keyof Message] = [];
        }
        // If the value is null and the key is not one of the array keys, set it to an empty string
        else if (value === null) {
            message[key as keyof Message] = '';
        }
    });
}

// Define a function to generate the date range filter
export function createDateRangeFilter(startDate: Date | undefined, endDate: Date | undefined): Record < string, Record < string, Date >> {

    if (startDate && endDate && startDate < endDate) {
        return {
            createdAt: {
                gte: startDate,
                lte: endDate,
            }
        };
    } else if (startDate && !endDate) {
        return {
            createdAt: {
                gte: startDate,
            }
        };
    } else if (!startDate && endDate) {
        return {
            createdAt: {
                lte: endDate,
            }
        };
    }

    return {};

}

export function processStringField(fieldValue: string): string {
    if (fieldValue && typeof fieldValue === 'string' && fieldValue.trim() !== '') {
        return fieldValue.trim()
    }

    return '';
}


export function processStringArrayField(fieldValue: string): string[] {
    if (fieldValue && typeof fieldValue === 'string' && fieldValue.trim() !== '') {
        return fieldValue.trim().split(',').map(value => value.trim());
    }

    return [];
}

export function processDateField(fieldValue: string): Date | undefined  {
    if (fieldValue && typeof fieldValue === 'string' && fieldValue.trim() !== '') {
        const convertedToDate = new Date(fieldValue.trim());
        if (!isNaN(convertedToDate.getTime())) {
            return convertedToDate;
        }
    }
    return undefined;
}
