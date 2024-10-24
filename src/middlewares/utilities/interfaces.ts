import { Request, RequestHandler } from "express";

export interface MiddlewareUtilities {
  getPublicAddress: (req: Request) => string;
  captureDeviceDetails: RequestHandler;
}
