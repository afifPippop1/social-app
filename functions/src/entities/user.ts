export interface IFullUser {
  id: string;
  disabled?: boolean;
  displayName: string;
  emailVerified?: boolean;
  email: string;
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
   * @param {string} email - The email address of the user.
   * @param {string?} displayName - The name of the user.
   */
  constructor(
    public id: string,
    public email: string,
    public displayName: string
  ) {}

  /**
   * Creates a User instance from a plain object
   * (e.g., request body or Firestore document).
   * @param {any} data - The raw object containing user data.
   * @return {User} A new User instance.
   */
  static fromJson(data: any): User {
    return new User(data.id, data.email, data.displayName);
  }

  /**
   * Converts the User instance into a plain object (e.g., for sending in
   * a response or saving).
   * @return {{id: string, displayName: string, email: string}}
   * A plain object representing the user.
   */
  toJson(): { id: string; displayName: string; email: string } {
    return {
      id: this.id,
      displayName: this.displayName,
      email: this.email,
    };
  }
}
