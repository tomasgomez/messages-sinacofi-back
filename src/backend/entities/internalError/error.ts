import { ErrorCode } from "./errorCode";

interface IError {
    message: string;      // User-friendly error message explaining the issue
    data?: any;           // Optional: Additional data related to the error (e.g., validation errors as an object)
    statusCode?: number;  // HTTP status code associated with the error
    code: ErrorCode;      // Unique identifier for the error type (e.g., "VALIDATION_ERROR", "NOT_FOUND")
}

class InternalError extends Error implements IError {
    message: string;
    data?: any;
    statusCode?: number;
    code: ErrorCode;

    constructor(message: string, code: ErrorCode, data?: any, statusCode?: number) {
        super(message);
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.code = code;
    }
}



export { InternalError };