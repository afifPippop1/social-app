import { Router } from "express";
import { userRoutes } from "./user-routes";

export const privateRoutes = Router();

privateRoutes.use("/users", userRoutes);
