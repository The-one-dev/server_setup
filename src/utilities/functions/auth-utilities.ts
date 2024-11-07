import jwt from "jsonwebtoken";

const getAccessToken = (payload: { email: string; role: string }): string => {
  const secret = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const token: string = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

export const authUtilities = {
  getAccessToken,
};
