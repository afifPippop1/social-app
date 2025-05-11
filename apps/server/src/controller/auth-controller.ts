import { Request, Response } from "express";
import { AuthRepository } from "../repository/auth-repository";
import { error, success } from "../utils/response";

/**
 * Controller class for handling auth-related operations.
 */
export class AuthController {
  /**
   * Handle sign in user
   * @param {Request}req
   * @param {Response}res
   * @return {Promise<void>}
   */
  static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { displayName, email, password } = req.body;
      const data = await AuthRepository.signUp({
        displayName,
        email,
        password,
      });
      res.status(201).json(success(data));
      return;
    } catch (e: any) {
      res.status(500).json(error(e?.message || "Something went wrong"));
      return;
    }
  }
}
