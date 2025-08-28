import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: number | null;
  username: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: number; username: string }>
    ) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
