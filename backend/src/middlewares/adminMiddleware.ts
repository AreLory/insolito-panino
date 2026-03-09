import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Accesso negato" });
  }

  next();
};
