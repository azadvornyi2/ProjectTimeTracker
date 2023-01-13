export class API {
  public static readonly SERVER_URL = "https://localhost:7053";

  public static readonly API_PART = "/api/v1/";

  public static readonly PROJECT_ENDPOINTS = {
    GET_ALL: API.API_PART + "projects/get/all",
    UPDATE: API.API_PART + "projects/update",
    CREATE: API.API_PART + "projects/create",
  };

  public static readonly TIME_TRACKING_ENDPOINTS = {
    GET_ALL: API.API_PART + "timetracking/get/all",
    UPDATE: API.API_PART + "timetracking/update",
    CREATE: API.API_PART + "timetracking/register",
    CALCULATE_HOURS_DIFFERENCE: (props: any) =>
      API.API_PART +
      "timetracking/difference/get?start=" +
      props.start +
      "&end=" +
      props.end,
  };

  public static readonly REPORTS_ENDPOINTS = {
    GET_ALL_PROJECT_HOURS: (props: any) =>
      API.API_PART +
      "reports/project/get/all?projectNetId=" +
      props.project.NetUid,
    GET_RANGE_PROJECT_HOURS: (props: any) =>
      API.API_PART +
      "reports/project/get/range?projectNetId=" +
      props.project.NetUid +
      "&start=" +
      props.dateStarts +
      "&end=" +
      props.dateEnds,
    GET_RANGE_HOURS: (props: any) =>
      API.API_PART +
      "reports/allprojects/get/range?start=" +
      props.dateStarts +
      "&end=" +
      props.dateEnds,
  };
}
