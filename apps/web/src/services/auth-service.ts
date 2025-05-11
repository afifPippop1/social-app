import { IFullUser } from "@ebuddy/user";

const LOCAL_BACKEND_URL = "http://127.0.0.1:5001/pippop-dev/us-central1/api";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || LOCAL_BACKEND_URL;

export class AuthService {
  static async signUp(data: Omit<IFullUser, "id">) {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }
}
