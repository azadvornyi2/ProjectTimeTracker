import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../models/entities/Projects/Project";
import { IProjectsState } from "../../models/states/projectsState";

const initProjectsState = () => {
    return {
        projects: [],
        selectedProject: null
    } as IProjectsState;
}

const projectsSlice = createSlice({
    name: "projects",
    initialState: initProjectsState(),
    reducers: {
        //endpoint to bind epics
        getAllProjectsRequest_api(state) {},
        CreateProjectRequest_api(state, action) {},
        updateProjectRequest_api(state,action) {
            
        },
        
        RemoveProjectRequest_api(state, action) {},
        setProjects(state,action){
            
            state.selectedProject = null;
            state.projects = action.payload.body;
        }
        //state changings
      
    }
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;