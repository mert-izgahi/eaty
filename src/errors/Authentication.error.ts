import ApiError from "./ApiError";

export default class AuthenticationError extends ApiError {
  constructor(message: string) {
    super(401, message);
  }
}
