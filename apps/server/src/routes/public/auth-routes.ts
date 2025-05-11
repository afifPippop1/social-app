import { Router } from "express";
import { AuthController } from "../../controller/auth-controller";

export const authRoutes = Router();

authRoutes.post("/sign-up", AuthController.signUp);
