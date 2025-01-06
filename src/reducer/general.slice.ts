import { createSlice } from "@reduxjs/toolkit";

export const NOTIFICATION_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
};

const initialState = {
  notificatiionData: {
    show: false,
    text: "",
    className: "",
    type: "",
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNotificationData: (state, action) => {
      if (action.payload.show) {
        const { text, type, className } = action.payload;
        state.notificatiionData.show = true;
        state.notificatiionData.text = text;
        state.notificatiionData.className = className ?? "";
        state.notificatiionData.type = type;
      } else {
        state.notificatiionData.show = false;
        state.notificatiionData.text = "";
        state.notificatiionData.className = "";
        state.notificatiionData.type = "";
      }
    },
  },
});

export const { setNotificationData } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
