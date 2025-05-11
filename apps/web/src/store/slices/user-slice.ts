import { IUser, User } from "@ebuddy/user";
import { UserService } from "@/services/user-service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type UserState = {
  user: IUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

type UpdateUserInfoData = Partial<Omit<IUser, "id">>;

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UpdateUserInfoData, { getState, dispatch }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) {
      return;
    }
    const res = await UserService.updateUser(userId, data);
    if (res.status === "success") {
      dispatch(getUser());
    }
    return null;
  }
);

export const getUser = createAsyncThunk(
  "user/get",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await UserService.me();
      if (user.status === "success") {
        const userJson = User.fromJson(user.data).toJson();
        return userJson;
      }
      return rejectWithValue("can not get user info");
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch user";
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch user";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
