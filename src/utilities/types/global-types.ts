import { NextFunction, Response, Request, RequestHandler } from "express";
import { ResponseObject } from "../interfaces/global-interface";

// export type SendResponse = (
//   res: Response,
//   statusCode: number,
//   message?: string,
//   data?: Record<string, any>
// ) => void;

export type SendResponse = (
  res: Response,
  responseObject: ResponseObject
) => void;

export type CatchAsyncErrorsWrapper = (
  fn: RequestHandler
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
