import { Response } from "express";
import { UserRepository } from "../repository/user-repository";
import { ExpressRequest } from "../types/express";
import { error, success } from "../utils/response";

/**
 * Controller class for handling signed-in-user-related operations.
 */
export class MeController {
  /**
   * Fetches all users and returns them in the response.
   * @param {ExpressRequest} req - Express request object (unused).
   * @param {Response} res - Express response object used to send the user data.
   * @return {Promise<void>}
   */
  static async FetchUser(req: ExpressRequest, res: Response): Promise<void> {
    try {
      const id = req.user?.uid;
      if (!id) throw Error("Unauthorized");
      const user = await UserRepository.getUserById(id);
      res.status(200).json(success(user));
      return;
    } catch (e: any) {
      res.status(500).json(error(e?.message || "Something went wrong"));
    }
  }
}
