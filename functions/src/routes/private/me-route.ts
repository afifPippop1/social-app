import { Router } from "express";
import { MeController } from "../../controller/me-controller";

export const meRoutes = Router();

meRoutes.get("/", MeController.FetchUser);
