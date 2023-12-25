import { Request, Response, NextFunction } from "express";
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.send("All menu items");
}
