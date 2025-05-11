export interface IFullUser {
  id: string;
  disabled?: boolean;
  displayName: string | null;
  email: string | null;
  password: string;
  photoURL?: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: EpochTimeStamp;
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
   * @param {string?} photoURL - The name of the user.
   * @param {string?} totalAverageWeightRatings - The name of the user.
   * @param {string?} numberOfRents - The name of the user.
   * @param {EpochTimeStamp?} recentlyActive - The name of the user.
   */
  constructor(
    public id: string,
    public email: string | null,
    public displayName: string | null,
    public photoURL?: string,
    public totalAverageWeightRatings?: number,
    public numberOfRents?: number,
    public recentlyActive?: EpochTimeStamp
  ) {}

  /**
   * Creates a User instance from a plain object
   * (e.g., request body or Firestore document).
   * @param {any} data - The raw object containing user data.
   * @return {User} A new User instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(data: any): User {
    const id = data?.id || data?.uid;
    if (
      !id ||
      typeof data?.email === "undefined" ||
      typeof data?.displayName === "undefined"
    ) {
      throw new Error(
        "can not create user, error: data not suite user interface"
      );
    }
    return new User(id, data.email, data.displayName);
  }

  /**
   * Converts the User instance into a plain object (e.g., for sending in
   * a response or saving).
   * @return {{id: string, displayName: string, email: string}}
   * A plain object representing the user.
   */
  toJson(): IUser {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
    };
  }
}
