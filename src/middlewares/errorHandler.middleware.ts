export default function errorHandlerMiddleware(
  error: Error,
  req: any,
  res: any,
  next: any
) {
  return res.status(500).json({
    state: "error",
    message: error.message,
    name: error.name,
  });
}
