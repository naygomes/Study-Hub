import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type RequestField = "body" | "params" | "query";

export const validateReference =
  (schema: ZodType<any>, field: RequestField = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[field]);

    if (!result.success) {
      const message = result.error.issues[0].message;
      res.status(400).json({ success: false, message });
      return;
    }

    if (field === "body") {
      req.body = result.data;
    }
    next();
  };
