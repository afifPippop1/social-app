import { IFullUser, User } from "@ebuddy/user";
import { auth } from "../config/firebase-config";
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
      // @ts-expect-error User object is nullable
      // and create user only accept undefined
      .createUser(user)
      .then(async (user) => {
        // See the UserRecord reference doc for the contents of userRecord.
        if (!user.uid || !user.email || !user.displayName) {
          throw new Error("Something went wrong");
        }
        const usr = User.fromJson(user).toJson();

        await UserRepository.addUser(usr);
        return user;
      })
      .then((user) => {
        return User.fromJson(user);
      });
    return res;
  }

  /**
   * Retrieves all users from the Firestore collection.
   * @param {string}id
   * @param {string}email
   * @return {Promise<User>}
   */
  static async updateEmail(id: string, email: string): Promise<User> {
    return User.fromJson(
      await auth.updateUser(id, {
        email,
      })
    );
  }
}
