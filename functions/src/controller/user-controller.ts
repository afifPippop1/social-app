import { Request, Response } from "express";
import { UserRepository } from "../repository/user-repository";
import { error, success } from "../utils/response";

/**
 * Controller class for handling user-related operations.
 */
export class UserController {
  /**
   * Fetches all users and returns them in the response.
   * @param {Request} req - Express request object (unused).
   * @param {Response} res - Express response object used to send the user data.
   * @return {Promise<void>}
   */
  static async FetchUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserRepository.getAll();
      res.status(200).json(success(users));
      return;
    } catch (e: any) {
      res.status(500).json(error(e?.message || "Something went wrong"));
      return;
    }
  }

  /**
   * Update user data and return updated status in the response.
   * @param {Request} req - Express request object (unused).
   * @param {Response} res - Express response object used to send the user data.
   * @return {Promise<void>}
   */
  static async UpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { email, displayName } = req.body;
      await UserRepository.updateUser({ id, email, displayName });
      res.status(200).json({ ok: true });
      return;
    } catch (e: any) {
      res.status(500).json(error(e?.message || "Something went wrong"));
      return;
    }
  }
}
