import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../models/entities/Projects/Project";
import { IProjectsState } from "../../models/states/projectsState";

const initProjectsState = () => {
  return {
    projects: [],
    selectedProject: null,
  } as IProjectsState;
};

const timeRegistersSlice = createSlice({
  name: "timeRegisters",
  initialState: initProjectsState(),
  reducers: {
    //endpoint to bind epics
    getAllRegisteredTimeRequest_api(state) {},
    registerTimeRequest_api(state, action) {},
    updateRegiseredTimeRequest_api(state, action) {},

    setRegisteredTime(state, action) {
      state.selectedProject = null;
      state.projects = action.payload.body;
    },
    //state changings
  },
});

export const registeredTimeActions = timeRegistersSlice.actions;
export default timeRegistersSlice.reducer;
