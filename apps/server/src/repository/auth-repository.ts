import { auth } from "../config/firebase-config";
import { IFullUser, User } from "../entities/user";
import { UserRepository } from "./user-repository";

/**
 * Repository class for accessing user data from firestore.
 */
export class AuthRepository {
  /**
   * Retrieves all users from the Firestore collection.
   * @param {IFullUser}user
   * @return {Promise<SignUpResult>}
   */
  static async signUp(user: Omit<IFullUser, "id">): Promise<User | null> {
    const res = await auth
      .createUser(user)
      .then(async (user) => {
        // See the UserRecord reference doc for the contents of userRecord.
        if (!user.uid || !user.email || !user.displayName) {
          throw new Error("Something went wrong");
        }

        await UserRepository.addUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        return user;
      })
      .then((user) => {
        return User.fromJson(user);
      });
    return res;
  }

  /**
   * Retrieves all users from the Firestore collection.
   * @param {IFullUser}user
   * @return {Promise<SignUpResult>}
   */
  static async signIn({
    email,
    password,
  }: Pick<IFullUser, "email" | "password">): Promise<void> {
    return;
  }
}
