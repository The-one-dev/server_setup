import { NextFunction, Response, Request } from "express";
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


export type RequestHandlerFunction = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type CatchAsyncErrorsWrapper = (
  fn: RequestHandlerFunction
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
