import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimeTrackingState } from "../../models/states/timeTrackingState";

const initTimeTrackingState = () => {
  return {
    trackedTime: [],
    selected: null,
  } as ITimeTrackingState;
};
const trackedTimeSlice = createSlice({
  name: "trackedTime",
  initialState: initTimeTrackingState(),
  reducers: {
    getAllRegisteredTimeRequest_api(state) {},
    registerTimeRequest_api(state, action) {},
    updateRegiseredTimeRequest_api(state, action) {},

    setRegisteredTime(state, action) {
      state.selected = null;
      state.trackedTime = action.payload.Body;
    },
  },
});

export const trackedTimeActions = trackedTimeSlice.actions;
export default trackedTimeSlice.reducer;
