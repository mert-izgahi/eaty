import { NextFunction, Request, Response } from "express";
import AuthenticationError from "../errors/Authentication.error";

export default function withAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = res.locals.user;
    if (payload && payload.id) {
      return next();
    }
    throw new AuthenticationError("User not authenticated");
  } catch (error) {
    return next(error);
  }
}
