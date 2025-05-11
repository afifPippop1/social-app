import { auth } from "@ebuddy/firebase/client";
import { IUser } from "@ebuddy/user";
import { getIdToken } from "firebase/auth";

const LOCAL_BACKEND_URL = "http://127.0.0.1:5001/pippop-dev/us-central1/api";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || LOCAL_BACKEND_URL;

export class UserService {
  static async getToken() {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    const token = await getIdToken(user);
    return `Bearer ${token}`;
  }

  static async me() {
    const authorization = await this.getToken();
    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
    });
    return await res.json();
  }

  static async updateUser(id: string, data: Partial<IUser>) {
    const authorization = await this.getToken();

    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  }
}
