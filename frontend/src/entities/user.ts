export interface IFullUser {
  id: string;
  disabled?: boolean;
  displayName: string | null;
  emailVerified?: boolean;
  email: string | null;
  password: string;
  photoURL?: string;
}

export type IUser = Omit<IFullUser, "password" | "disabled">;

/**
 * Represents a User entity.
 */
export class User implements IUser {
  /**
   * Creates a new User instance.
   * @param {string} id - The unique identifier for the user.
   * @param {string|null} email - The email address of the user.
   * @param {string|null} displayName - The name of the user.
   */
  constructor(
    public id: string,
    public email: string | null,
    public displayName: string | null
  ) {}

  /**
   * Creates a User instance from a plain object
   * (e.g., request body or Firestore document).
   * @param {any} data - The raw object containing user data.
   * @return {User} A new User instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(data: any): User {
    return new User(data.id, data.email, data.displayName);
  }

  /**
   * Converts the User instance into a plain object (e.g., for sending in
   * a response or saving).
   * @return {{id: string, displayName: string, email: string}}
   * A plain object representing the user.
   */
  toJson(): { id: string; email: string | null; displayName: string | null } {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
    };
  }
}
