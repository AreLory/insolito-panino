import { NextFunction, Response, Request } from "express";
import { Error } from "mongoose";

export const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof Error.ValidationError ? 400 : 500;
  res.status(status).json({ 
    error: err.message || "Server error" 
  });
};
