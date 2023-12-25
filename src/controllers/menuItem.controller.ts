import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequest.error";
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    throw new BadRequestError("Not implemented");
  } catch (error) {
    next(error);
  }
}
