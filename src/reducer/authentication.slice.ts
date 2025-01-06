import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthData: {
    success: false,
    data: null,
  },
};

export const authenticatioSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.userAuthData = action.payload;
    },
  },
});

export const { setAuthData } = authenticatioSlice.actions;

export const authenticationReducer = authenticatioSlice.reducer;
