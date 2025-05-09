import { Router } from "express";
import { authRoutes } from "./auth-routes";

export const publicRoutes = Router();
publicRoutes.use(authRoutes);
