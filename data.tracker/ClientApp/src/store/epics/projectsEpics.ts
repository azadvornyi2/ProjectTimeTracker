import { AnyAction } from "redux";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { projectsActions } from "../reducers/ProjectReduser";
import { catchError, map, mergeMap, switchMap } from "rxjs/internal/operators";
import { Project } from "../../models";

export const getAllProjectsRequestEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectsActions.getAllProjectsRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON<Project[]>(
          "https://localhost:7053/api/v1/projects/get/all"
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

export const changeProjectRequestEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectsActions.updateProjectRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .post("https://localhost:7053/api/v1/projects/update", action.payload, {
          "Content-Type": "application/json",
        })
        .pipe(
          map((payload) => {
            let _p: any = payload.response;

            return { type: projectsActions.setProjects.type, payload: _p };
          })
        );
    })
  );
};

export const createProjectRequestEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectsActions.CreateProjectRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .post("https://localhost:7053/api/v1/projects/create", action.payload, {
          "Content-Type": "application/json",
        })
        .pipe(
          map((payload) => {
            let _p: any = payload.response;

            return { type: projectsActions.setProjects.type, payload: _p };
          })
        );
    })
  );
};
