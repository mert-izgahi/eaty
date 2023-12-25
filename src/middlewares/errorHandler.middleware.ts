import { BadRequestError } from "../errors/BadRequest.error";

export default function errorHandlerMiddleware(
  error: Error,
  req: any,
  res: any,
  next: any
) {
  if (error instanceof BadRequestError) {
    return res.status(error.status).json({
      state: "error",
      message: error.message,
      name: error.name,
    });
  }
  return res.status(500).json({
    state: "error",
    message: error.message,
    name: error.name,
  });
}
