import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import projectReduser from "./ProjectReducer";
import timeTrackingReducer from "./timeTrackingReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  modal: modalReducer,
  projects: projectReduser,
  trackedTime: timeTrackingReducer,
  notification: notificationReducer,
});

export default rootReducer;
