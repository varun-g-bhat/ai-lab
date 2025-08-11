import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authData",
  initialState: {
    username: "Guest",
    userId: "",
    userDetails: {},
    isLogined: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.userDetails.name;
      state.userId = action.payload.userId;
      state.userDetails = action.payload.userDetails;
      state.isLogined = true;
    },
    verifyUser: (state, action) => {
      state.username = action.payload.userDetails.name;
      state.userId = action.payload.userId;
      state.userDetails = action.payload.userDetails;
      state.isLogined = true;
    },
    logoutUser: (state) => {
      state.username = "Guest";
      state.userId = "";
      state.isLogined = false;
    },
  },
});

export const { loginUser, verifyUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
