import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import projectReduser from "./ProjectReduser";

const rootReducer = combineReducers({
    routing: routerReducer,
    modal: modalReducer,
    projects: projectReduser,
}); 

export default rootReducer;