import { AnyAction } from "redux";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { projectsActions } from "../reducers/ProjectReduser";
import { catchError, map, mergeMap, switchMap } from "rxjs/internal/operators";
import { Project } from "../../models";
import { registeredTimeActions } from "../reducers/timeRegisterReducer";

export const getAllTimesRegister = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(registeredTimeActions.getAllRegisteredTimeRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON<Project[]>(
          "https://localhost:7053/api/v1/timetracking/get/all"
          // {'Content-Type': 'application/json'}
        )
        .pipe(
          map((payload) => {
            return { type: projectsActions.setProjects.type, payload };
          })
        );
    })
  );
};
