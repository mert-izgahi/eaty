import { BadRequestError } from "../errors/BadRequest.error";
import NotFoundError from "../errors/NotFound.error";

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

  if (error instanceof NotFoundError) {
    return res.status(error.status).json({
      state: "error",
      message: error.message,
      name: error.name,
    });
  }

  if (error.name === "ValidationError") {
    
    const fixedMessage = Object.values((error as any).errors)
      .map((err: any) => err.message)
      .join(", ");
    return res.status(400).json({
      state: "error",
      message: fixedMessage,
      name: error.name,
    });
  }
  return res.status(500).json({
    state: "error",
    message: error.message,
    name: error.name,
  });
}
