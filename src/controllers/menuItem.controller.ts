import { Request, Response, NextFunction } from "express";
import MenuItem, { IMenuItemSchema } from "../models/menuItem.model";
export async function getAllMenuItems(
  req: Request<{ category?: string }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const menuItems = await MenuItem.getAllItems();
    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(
  req: Request<{}, {}, IMenuItemSchema>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const menuItem = await MenuItem.createOneItem(body);
    res.status(200).json(menuItem);
  } catch (error) {
    next(error);
  }
}
