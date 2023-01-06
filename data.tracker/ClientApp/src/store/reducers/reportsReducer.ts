import { createSlice } from "@reduxjs/toolkit";
import { IReportsState } from "../../models/states/reportsState";

const initReportsState = () => {
  return {
    reports: [],
    selectedReport: null,
  } as IReportsState;
};

const reportsSlise = createSlice({
  name: "reports",
  initialState: initReportsState(),
  reducers: {
    getAllProjectHoursRequest_api(state, action) {},
    getRangeProjectHours(state, action) {},
    getHoursRange(state, action) {},
  },
});
