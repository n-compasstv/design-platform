import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";

type AppState = {
  user: UserModel;
};

const initialState: AppState = {
  user: {
    id: "",
    username: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogonUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
  },
});

export const { setLogonUser } = userSlice.actions;

export default userSlice.reducer;
