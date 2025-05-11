import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

export interface ExpressRequest extends Request {
  user?: DecodedIdToken;
}
