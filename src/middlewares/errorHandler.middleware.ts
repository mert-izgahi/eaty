import { CastError } from "mongoose";
import { BadRequestError } from "../errors/BadRequest.error";
import NotFoundError from "../errors/NotFound.error";
import AuthenticationError from "../errors/Authentication.error";

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

  if (error.name === "CastError") {
    const { path, value } = error as CastError;
    return res.status(400).json({
      state: "error",
      message: `Invalid value for ${path}: ${value._id}`,
      name: error.name,
    });
  }
  if (error instanceof AuthenticationError) {
    return res.status(error.status).json({
      state: "error",
      message: error.message,
      name: error.name,
    });
  }
  if (error.name === "TypeError") {
    const { stack } = error;
    return res.status(500).json({
      state: "error",
      message: error.message,
      name: error.name,
      stack: stack?.split("\n"),
    });
  }
  if(error.name === "JsonWebTokenError"){
    return res.status(401).json({
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
