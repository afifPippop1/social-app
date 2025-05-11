import { NextFunction, Response } from "express";
import { auth } from "../config/firebase-config";
import { ExpressRequest } from "../types/express";
import { error } from "../utils/response";

export const authMiddleware = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json(error("Unauthorized"));
    return;
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json(error("Unauthorized"));
    return;
  }
};
