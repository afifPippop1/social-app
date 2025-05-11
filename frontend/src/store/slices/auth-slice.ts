import { auth } from "@/config/firebase";
import { UserService } from "@/services/user-service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "./user-slice";

export const listenToAuth = createAsyncThunk<string | null>(
  "auth/listen",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const me = await UserService.me();
          if (me.status === "success") {
            dispatch(getUser());
            // dispatch(setUser(u));
            resolve(user.getIdToken());
            return;
          }
        }
        resolve(null);
      });
    });
  }
);

type AuthState = {
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listenToAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(listenToAuth.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(listenToAuth.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
