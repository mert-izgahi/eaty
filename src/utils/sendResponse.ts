import { Response } from "express";

export default async function sendResponse(
  res: Response,
  status: number,
  message: string,
  data: any
) {
  return res.status(status).json({ message, data });
}
