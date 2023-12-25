import ApiError from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message);
    this.name = "BadRequestError";
  }
}
