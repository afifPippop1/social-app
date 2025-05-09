import { Router } from "express";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";
import { authMiddleware } from "../middleware/auth-middleware";

export const routes = Router();

routes.use(publicRoutes);

routes.use(authMiddleware, privateRoutes);
