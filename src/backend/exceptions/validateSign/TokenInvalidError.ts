import { BaseError } from "../BaseError";

export class TokenInvalidError extends BaseError {
  constructor(message?: string) {
    super(message);
    this.exception='TOKEN_INVALID_ERROR';
    this.status = 401;
  }
}