import { Report } from "../entities/Reports/Report";

export interface IReportsState {
  reports: Report[];
  selectedReport: Report;
}
