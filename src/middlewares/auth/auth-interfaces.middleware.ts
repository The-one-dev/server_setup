import { JwtPayload } from "jsonwebtoken";

export interface VerifiedToken extends JwtPayload {
  email: string;
  role: string;
}
