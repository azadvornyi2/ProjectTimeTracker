import { RouterState } from "react-router-redux";
import { IModalState } from "./modalState";
import { IProjectsState } from "./projectsState";
import { ITimeTrackingState } from "./timeTrackingState";
import { IReportsState } from "./reportsState";
import { INotificationState } from "./notificationState";
import { ITimeDifferenceState } from "./timeDifferenceState";

export interface IAppState {
  routing: RouterState;
  modal: IModalState;
  projects: IProjectsState;
  trackedTime: ITimeTrackingState;
  reports: IReportsState;
  timeDifference: ITimeDifferenceState;
  notification: INotificationState;
}
