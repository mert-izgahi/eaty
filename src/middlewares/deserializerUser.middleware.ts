import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";

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
    const payload = verify(token, config.get<string>("jwtPrivateKey"));
    
    
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
