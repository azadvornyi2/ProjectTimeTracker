import { Project } from "../Projects/Project";

export class TimeRegister {
    public Starts: Date;
    public Ends: Date;
    public Duration: number;
    public ProjectId: number;
    public Notes: string;
    public Project: Project
}