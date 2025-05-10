import { Router } from "express";
import { userRoutes } from "./user-route";
import { meRoutes } from "./me-route";

export const privateRoutes = Router();

privateRoutes.use("/me", meRoutes);
privateRoutes.use("/users", userRoutes);
