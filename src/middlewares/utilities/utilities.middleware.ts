import { Request, RequestHandler } from "express";
import { DeviceDetails } from "./utilities-interface.middleware";

const getIpAddress = (req: Request): string => {
  const xForwardedFor = req.header("x-forwarded-for");

  const ip =
    (xForwardedFor ? xForwardedFor.split(",")[0].trim() : null) ||
    req.ips[0] ||
    req.ip;

  if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:")) {
    return "localhost";
  }

  return ip;
};

const restrictTo = () => {};

const captureDevice: RequestHandler = (req, res, next) => {
  const userAgent = req.headers["user-agent"] || "Unknown";

  const ip = getIpAddress(req) || "Unknown";

  const browser =
    RegExp(/(Firefox|Chrome|Safari|Opera|MSIE|Trident|Brave|Edge)/i).exec(
      userAgent
    )?.[0] || "Unknown";

  const os = RegExp(/\(([^)]+)\)/).exec(userAgent)?.[1] || "Unknown";

  const time = new Date();

  const deviceDetails: DeviceDetails = {
    ip,
    userAgent,
    os,
    time,
    browser,
  };

  res.locals["deviceDetails"] = deviceDetails;

  return next();
};

const requestLogger: RequestHandler = (req, res, next) => {
  const { method, url, ip } = req;

  const deviceDetails = { ...(res.locals.deviceDetails as DeviceDetails) };

  const time = deviceDetails.time;

  const requestLog = `${time.toUTCString()}: ${method} to ${url} by ${ip}`;

  console.log(`\n${requestLog}`);

  return next();
};

export const utilities = {
  captureDevice,
  requestLogger,
};
