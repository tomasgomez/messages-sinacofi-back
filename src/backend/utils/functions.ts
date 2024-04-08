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

