import { TimeRegister } from "../entities/TimeTracking/TimeRegister";

export interface ITimeTrackingState {
  trackedTime: TimeRegister[];
  selected: TimeRegister;
}
