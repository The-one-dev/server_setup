import { MiddlewareUtilities } from "./interfaces";

export const utilities: MiddlewareUtilities = {
  getPublicAddress: (req) => {
    const xForwardedFor = req.header("x-forwarded-for");

    const ip =
      (xForwardedFor ? xForwardedFor.split(",")[0].trim() : null) ||
      req.ips[0] ||
      req.ip;

    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:")) {
      return "localhost";
    }

    return ip;
  },

  captureDeviceDetails: (req, res, next) => {
    const userAgent = req.headers["user-agent"] || "Unknown";

    const ip = utilities.getPublicAddress(req) || "Unknown";

    const browser =
      RegExp(/(Firefox|Chrome|Safari|Opera|MSIE|Trident|Brave|Edge)/i).exec(
        userAgent
      )?.[0] || "Unknown";

    const os = RegExp(/\(([^)]+)\)/).exec(userAgent)?.[1] || "Unknown";

    const time = new Date().toUTCString();

    const deviceDetails = {
      ip,
      userAgent,
      os,
      time,
      browser,
    };

    res.locals["deviceDetails"] = deviceDetails;

    return next();
  },
};
