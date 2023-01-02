import { Project } from "../entities/Projects/Project";

export interface IProjectsState{
    projects: Project[],
    selectedProject: Project;
}