import { Request, Response, NextFunction } from "express";
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    next(error);
  }
}
