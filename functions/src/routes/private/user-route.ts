import { Router } from "express";
import { UserController } from "../../controller/user-controller";

export const userRoutes = Router();

userRoutes.get("/", UserController.FetchUsers);
userRoutes.patch("/:id", UserController.UpdateUser);
