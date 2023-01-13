import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimeDifferenceState } from "../../models";
import { ITimeTrackingState } from "../../models/states/timeTrackingState";

const initTimeDifference = () => {
  return {
    timeDifference: undefined,
  } as ITimeDifferenceState;
};

const timeDifferenceSlice = createSlice({
  name: "timeDifference",
  initialState: initTimeDifference(),
  reducers: {
    calculateHoursDifferenceRequest_api(state, action) {},

    setHoursDifference(state, action) {
      if (action.payload.Body) {
        state.timeDifference = action.payload.Body;
      } else {
        state.timeDifference = action.payload;
      }
    },
  },
});

export const timeDifferenceActions = timeDifferenceSlice.actions;
export default timeDifferenceSlice.reducer;
