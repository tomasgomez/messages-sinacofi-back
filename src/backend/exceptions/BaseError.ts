export class BaseError extends Error {
  status: number;
  exception: string;
  constructor(message?: string, exception?: string, status:number = 500) {
    super(message);
    this.status = status || 500;
    this.exception = exception || 'INTERNAL_SERVER_ERROR';

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}