import { auth } from "@/config/firebase";
import { IUser, User } from "@/entities/user";
import { UserService } from "@/services/user-service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

export const listenToAuth = createAsyncThunk<IUser | null>(
  "auth/listen",
  async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const me = await UserService.me();
          if (me.status === "success") {
            const u = User.fromJson(me.data).toJson();
            console.log(u);
            resolve(u);
            return;
          }
        }
        resolve(null);
      });
    });
  }
);

type AuthState = {
  user: IUser | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: AuthState = {
  user: null,
  loading: true,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listenToAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(listenToAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(listenToAuth.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
