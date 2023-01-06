import { RouterState } from "react-router-redux";
import { IModalState } from "./modalState";
import { IProjectsState } from "./projectsState";
import { ITimeTrackingState } from "./timeTrackingState";
import { IReportsState } from "./reportsState";
import { INotificationState } from "./notificationState";

export interface IAppState {
  routing: RouterState;
  modal: IModalState;
  projects: IProjectsState;
  trackedTime: ITimeTrackingState;
  reportsState: IReportsState;
  notification: INotificationState;
}
