import {
    format
} from 'date-fns';

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