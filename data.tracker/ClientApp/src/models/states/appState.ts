import { RouterState } from "react-router-redux";
import { IModalState } from "./modalState";
import { IProjectsState } from "./projectsState";

export interface IAppState {
    routing: RouterState,
    modal: IModalState,
    projects: IProjectsState,
}