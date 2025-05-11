import { db } from "@ebuddy/firebase/server";
import { collections } from "../constants/firestore-collection";
import { IUser, User } from "@ebuddy/user";
import { AuthRepository } from "./auth-repository";

const userRefs = db.collection(collections.Users);

/**
 * Repository class for accessing user data from Firestore.
 */
export class UserRepository {
  /**
   * Retrieves all users from the Firestore collection.
   *
   * @return {Promise<User[]>} A promise that resolves to an array of `User`.
   */
  static async getAll(): Promise<User[]> {
    const snapshot = await userRefs.get();
    return snapshot.docs.map((doc) => User.fromJson(doc.data()));
  }

  /**
   * Retrieves user by Id from the Firestore collection.
   * @param {string}id
   * @return {Promise<User?>} A promise that resolves to an array of `User`.
   */
  static async getUserById(id: string): Promise<User | undefined> {
    const snapshot = await userRefs.doc(id).get();
    return User.fromJson(snapshot.data());
  }

  /**
   * Retrieves user by email from the Firestore collection.
   * @param {string}email
   * @return {Promise<User?>} A promise that resolves to an array of `User`.
   */
  static async getUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await userRefs.where("email", "==", email).limit(1).get();

    if (snapshot.empty) return undefined;

    const doc = snapshot.docs[0];
    return User.fromJson({ id: doc.id, ...doc.data() });
  }

  /**
   * Retrieves all users from the Firestore collection.
   * @param {Partial<User>}user
   * @return {Promise<void>} A promise that resolves to an array of `User`.
   */
  static async addUser(user: IUser): Promise<void> {
    await userRefs.doc(user.id).set(user);
    return;
  }

  /**
   * Retrieves all users from the Firestore collection.
   * @param {Partial<User>}user
   * @return {Promise<void>} A promise that resolves to an array of `User`.
   */
  static async updateUser(
    user: Partial<IUser> & Pick<IUser, "id">
  ): Promise<void> {
    if (user.email) {
      await AuthRepository.updateEmail(user.id, user.email);
    }
    await userRefs.doc(user.id).update(this.sanitizeData(user));
    return;
  }

  /**
   * Eliminate undefined key value pairs
   * @param {T}data
   * @return {T}
   */
  static sanitizeData<T>(data: T): T {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch {
      return data;
    }
  }
}
