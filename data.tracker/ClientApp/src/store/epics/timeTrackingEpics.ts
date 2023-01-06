import { AnyAction } from "redux";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import timeTrackingReducer, {
  trackedTimeActions,
} from "../reducers/timeTrackingReducer";
import { catchError, map, mergeMap, switchMap } from "rxjs/internal/operators";
import { TimeRegister } from "../../models";
import { API } from "./Endpoints";
import { Notification } from "../../components/General/Notifications/notification";
import { dispatch } from "rxjs/internal/observable/pairs";
import { notificationActions } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { of } from "rxjs";

export const getAllTrackedTimeEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(trackedTimeActions.getAllRegisteredTimeRequest_api.type),
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
            return { type: trackedTimeActions.setRegisteredTime.type, payload };
          })
        );
    })
  );
};

export const updateTrackedTimeEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(trackedTimeActions.updateRegiseredTimeRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .post(
          API.SERVER_URL + API.TIME_TRACKING_ENDPOINTS.UPDATE,
          action.payload,
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          mergeMap((payload) => {
            let _p: any = payload.response;
            return of(
              notificationActions.getNofitifcation(_p),
              trackedTimeActions.setRegisteredTime(_p)
            );
          })
        );
    })
  );
};

export const registerTimeEpic = (action$: AnyAction, state$: TimeRegister) => {
  return action$.pipe(
    ofType(trackedTimeActions.registerTimeRequest_api.type),
    switchMap((action: AnyAction) => {
      return ajax
        .post(
          API.SERVER_URL + API.TIME_TRACKING_ENDPOINTS.CREATE,
          action.payload,
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          mergeMap((payload) => {
            let _p: any = payload.response;

            return of(
              notificationActions.getNofitifcation(_p),
              trackedTimeActions.setRegisteredTime(_p)
            );
          })
        );
    })
  );
};
