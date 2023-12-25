import { Request, Response } from "express";
import MenuItem, { IMenuItemSchema } from "../models/menuItem.model";
import sendResponse from "../utils/sendResponse";

export async function getMenuItemsController(
  req: Request<{ category?: string }, {}, {}>,
  res: Response
) {
  const { category } = req.query;
  if (category) {
    const menuItems = await MenuItem.getItems({ category });
    return sendResponse(res, 200, "Menu items fetched successfully", menuItems);
  }
  const menuItems = await MenuItem.getItems({});
  return sendResponse(res, 200, "Menu items fetched successfully", menuItems);
}

export async function getOneItemController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const menuItem = await MenuItem.getOneItem(id!);
  return sendResponse(res, 200, "Menu item fetched successfully", menuItem);
}

export async function createMenuItemController(
  req: Request<{}, {}, IMenuItemSchema>,
  res: Response
) {
  const body = req.body;
  const menuItem = await MenuItem.createOneItem(body);
  return sendResponse(res, 201, "Menu item created successfully", menuItem);
}

export async function deleteOneItemController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const menuItem = await MenuItem.deleteOneItem({ _id: id });
  return sendResponse(res, 200, "Menu item deleted successfully", menuItem);
}

export async function updateOneItemController(
  req: Request<{ id?: string }, {}, IMenuItemSchema>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;
  const menuItem = await MenuItem.updateOneItem(id!, body);
  return sendResponse(res, 200, "Menu item updated successfully", menuItem);
}
