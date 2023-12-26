import { Request, Response } from "express";
import User, { IUserSchema } from "../models/users.model";
import sendResponse from "../utils/sendResponse";
import AuthenticationError from "../errors/Authentication.error";

export async function registerUserController(
  req: Request<{}, {}, IUserSchema>,
  res: Response
) {
  const body = req.body;

  const userDoc = await User.getOneUserByEmail(req.body.email!);
  if (userDoc) {
    throw new AuthenticationError("User already exists");
  }

  const user = await User.createUser(body);
  const token = await user.generateToken();
  return sendResponse(res, 201, "User created successfully", token);
}

export async function LoginUserController(
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) {
  const { email, password } = req.body;
  const userDoc = await User.getOneUserByEmail(email);

  if (!userDoc) {
    throw new AuthenticationError("Invalid credentials, user not found");
  }

  const isCorrect = await userDoc.comparePassword(password);

  if (!isCorrect) {
    throw new AuthenticationError("Invalid credentials, wrong password");
  }
  const agent = req.get("user-agent") || "unknown";

  await User.updateUser({ _id: userDoc._id }, { agent }, { new: true });

  const token = await userDoc.generateToken();

  return sendResponse(res, 200, "User logged in successfully", token);
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

export async function updateOneUserController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;
  const user = await User.updateUser({ _id: id }, body , { new: true });
  return sendResponse(res, 200, "User updated successfully", user);
}
