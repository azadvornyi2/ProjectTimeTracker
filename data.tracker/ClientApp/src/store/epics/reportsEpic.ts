import { AnyAction } from "redux";
import { reportActions } from "../reducers/reportsReducer";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { map, mergeMap, switchMap } from "rxjs/internal/operators";
import { API } from "./Endpoints";
import { notificationActions, timeDifferenceActions } from "../reducers";
import { of } from "rxjs";
import { TimeRegister } from "../../models";

export const getHoursRangeEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(reportActions.getHoursRange),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON(
          API.SERVER_URL +
            API.REPORTS_ENDPOINTS.GET_RANGE_HOURS(action.payload),
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          mergeMap((payload: any) => {
            return of(
              reportActions.setReport(payload),
              notificationActions.getNofitifcation(payload)
            );
          })
        );
    })
  );
};

export const getAllProjectHoursEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(reportActions.getAllProjectHoursRequest_api),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON(
          API.SERVER_URL +
            API.REPORTS_ENDPOINTS.GET_ALL_PROJECT_HOURS(action.payload),
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          mergeMap((payload: any) => {
            return of(
              reportActions.setReport(payload),
              notificationActions.getNofitifcation(payload)
            );
          })
        );
    })
  );
};

export const getRangeProjectHoursEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(reportActions.getRangeProjectHours),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON(
          API.SERVER_URL +
            API.REPORTS_ENDPOINTS.GET_RANGE_PROJECT_HOURS(action.payload),
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          mergeMap((payload: any) => {
            return of(
              reportActions.setReport(payload),
              notificationActions.getNofitifcation(payload)
            );
          })
        );
    })
  );
};

export const getAllTrackedTimeEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(reportActions.getAllRegisteredTime.type),
    switchMap((action: AnyAction) => {
      return ajax
        .getJSON<TimeRegister[]>(
          API.SERVER_URL + API.TIME_TRACKING_ENDPOINTS.GET_ALL,
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          map((payload) => {
            return { type: reportActions.setReport.type, payload };
          })
        );
    })
  );
};
