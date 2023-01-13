import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import projectReduser from "./ProjectReducer";
import timeTrackingReducer from "./timeTrackingReducer";
import notificationReducer from "./notificationReducer";
import timeDifferenceReducer from "./timeDifferenceReducer";
import reportsReducer from "./reportsReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  modal: modalReducer,
  projects: projectReduser,
  trackedTime: timeTrackingReducer,
  reports: reportsReducer,
  notification: notificationReducer,
  timeDifference: timeDifferenceReducer,
});

export default rootReducer;
