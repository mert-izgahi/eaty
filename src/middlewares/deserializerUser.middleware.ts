import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../../configs";

export default async function deserializerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;
    const token = authorization?.split(" ")[1] as string;
    if (!token) {
      return next();
    }
    const key = config.jwtPrivateKey;
    if (!key) {
      return next();
    }

    const payload = verify(token, key);

    if (!payload) {
      return next();
    }

    // assign user to res.locals
    res.locals.user = payload;
    next();
  } catch (error) {
    return next(error);
  }
}
