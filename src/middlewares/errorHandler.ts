import { Request, Response, NextFunction } from "express";
import { AppError } from "@errors";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  return res.status(500).json({
    success: false,
    message: "Erro interno no servidor.",
    status: 500,
  });
}
