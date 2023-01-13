import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, TimeRegister } from "../../models";
import { IReportsState } from "../../models/states/reportsState";
import { trackedTimeActions } from "./timeTrackingReducer";

const initReportsState = () => {
  return {
    report: {
      ReportType: "",
      ProjectName: "",
      StartDate: "",
      EndDate: "",
      RegisteredTime: [],
    },
  } as IReportsState;
};

const reportsSlise = createSlice({
  name: "reports",
  initialState: initReportsState(),
  reducers: {
    getAllRegisteredTime(state) {},
    getAllProjectHoursRequest_api(state, action) {},
    getRangeProjectHours(state, action) {},
    getHoursRange(state, action) {},

    setReport(state, action) {
      state.report = action.payload.Body;
    },

    removeReport(state) {
      initReportsState();
    },
  },
});

export const reportActions = reportsSlise.actions;
export default reportsSlise.reducer;
