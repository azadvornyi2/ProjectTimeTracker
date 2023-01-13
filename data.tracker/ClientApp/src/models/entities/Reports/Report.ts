import { Project } from "../Projects/Project";
import { TimeRegister } from "../TimeTracking/TimeRegister";

export class Report {
  ReportType: string;
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  RegisteredTime: TimeRegister[];
}
