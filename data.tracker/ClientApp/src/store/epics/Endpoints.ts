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
  };

  public static readonly REPORTS_ENDPOINTS = {
    GET_ALL_PROJECT_HOURS: API.API_PART + "report/project/get/all",
    GET_RANGE_PROJECT_HOURS: API.API_PART + "report/project/get/range",
    GET_RANGE_HOURS: API.API_PART + "report/allprojects/get/range",
  };
}
