import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import Order, { IOrderSchema } from "../models/order.model";

export async function getOrdersController(req: Request, res: Response) {
  const orders = await Order.getOrders({});

  return sendResponse(res, 200, "Orders fetched successfully", orders);
}

export async function getOneOrderController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.getOneOrder(id!);
  return sendResponse(res, 200, "Order fetched successfully", order);
}

export async function createOrderController(
  req: Request<{}, {}, IOrderSchema>,
  res: Response
) {
  const order = await Order.createOneOrder(req.body);
  return sendResponse(res, 201, "Order created successfully", order);
}

export async function deleteOneOrderController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.deleteOneOrder({ _id: id });
  return sendResponse(res, 200, "Order deleted successfully", order);
}

export async function updateOneOrderController(
  req: Request<{ id?: string }, {}, IOrderSchema>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.updateOneOrder({ _id: id }, req.body, {
    new: true,
  });
  return sendResponse(res, 200, "Order updated successfully", order);
}
