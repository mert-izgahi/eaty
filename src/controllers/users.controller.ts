import { Request, Response } from "express";
import User, { IUserSchema } from "../models/users.model";
import sendResponse from "../utils/sendResponse";

export async function registerUserController(
  req: Request<{}, {}, IUserSchema>,
  res: Response
) {
  const body = req.body;

  const userDoc = await User.getOneUserByEmail(req.body.email!);
  if (userDoc) {
    return sendResponse(res, 400, "User already exists", null);
  }

  const user = await User.createUser(body);
  const token = await user.generateToken();
  return sendResponse(res, 201, "User created successfully", token);
}

export async function getUsersController(req: Request, res: Response) {
  const users = await User.getUsers({});
  return sendResponse(res, 200, "Users fetched successfully", users);
}

export async function getOneUserController(req: Request, res: Response) {
  const { id } = req.params;

  const user = await User.getOneUserById(id);

  if (!user) {
    return sendResponse(res, 404, "User not found", null);
  }

  return sendResponse(res, 200, "User fetched successfully", user);
}
