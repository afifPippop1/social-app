import { auth } from "@/config/firebase";
import { User } from "@/entities/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

// export interface User {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
// }

export const listenToAuth = createAsyncThunk<User | null>(
  "auth/listen",
  async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          resolve(User.fromJson({ id: user.uid, ...user }));
        } else {
          resolve(null);
        }
      });
    });
  }
);

type AuthState = {
  user: User | null;
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
