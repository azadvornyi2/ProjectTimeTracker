import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { INotificationState } from "../../models/states/notificationState";

const initNotificationState = () => {
  return {
    notification: {
      statusCode: undefined,
      message: "",
    },
  } as INotificationState;
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initNotificationState(),
  reducers: {
    getNofitifcation(state, action) {
      toast.success(action.payload.Message);
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
