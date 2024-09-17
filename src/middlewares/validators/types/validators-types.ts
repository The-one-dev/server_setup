import { Request, Response, NextFunction } from "express";

export type RequestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
