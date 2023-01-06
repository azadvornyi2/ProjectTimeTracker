import { AnyAction } from "redux";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { projectsActions } from "../reducers/ProjectReducer";
import { catchError, map, mergeMap, switchMap } from "rxjs/internal/operators";
import { Project, TimeRegister } from "../../models";
import { API } from "./Endpoints";
import { trackedTimeActions } from "../reducers/timeTrackingReducer";
import { notificationActions } from "../reducers";
import { of } from "rxjs";

export const getAllProjectsRequestEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectsActions.getAllProjectsRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON<Project[]>(API.SERVER_URL + API.PROJECT_ENDPOINTS.GET_ALL, {
          "Content-Type": "application/json",
        })
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
        .post(API.SERVER_URL + API.PROJECT_ENDPOINTS.UPDATE, action.payload, {
          "Content-Type": "application/json",
        })
        .pipe(
          mergeMap((payload) => {
            let _p: any = payload.response;

            return of(
              projectsActions.setProjects(_p),
              notificationActions.getNofitifcation(_p)
            );
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
        .post(API.SERVER_URL + API.PROJECT_ENDPOINTS.CREATE, action.payload, {
          "Content-Type": "application/json",
        })
        .pipe(
          mergeMap((payload) => {
            let _p: any = payload.response;

            return of(
              projectsActions.setProjects(_p),
              notificationActions.getNofitifcation(_p)
            );
          })
        );
    })
  );
};
