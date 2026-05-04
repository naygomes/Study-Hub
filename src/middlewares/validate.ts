import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type RequestField = "body" | "params" | "query";

export const validate =
  (schema: ZodType, field: RequestField = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[field]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      res.status(400).json({ success: false, errors });
      return;
    }

    if (field === "body") {
      req.body = result.data;
    }
    next();
  };
