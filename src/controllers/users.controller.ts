import { Request, Response } from "express";
import User, { IUserSchema } from "../models/users.model";
import sendResponse from "../utils/sendResponse";

export async function registerUserController(
  req: Request<{}, {}, IUserSchema>,
  res: Response
) {
  const body = req.body;
  const user = await User.registerUser(body);
  return sendResponse(res, 201, "User created successfully", user);
}

export async function getUsersController(req: Request, res: Response) {
  const users = await User.getUsers({});
  return sendResponse(res, 200, "Users fetched successfully", users);
}

export async function getOneUserController(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.getOneUser(id!);
  return sendResponse(res, 200, "User fetched successfully", user);
}
