import { NextFunction, Response, Request } from "express";

export type SendResponse = (
  res: Response,
  statusCode: number,
  message?: string,
  data?: Record<string, any>
) => void;

export type RequestHandlerFunction = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type CatchAsyncErrorsWrapper = (
  fn: RequestHandlerFunction
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
