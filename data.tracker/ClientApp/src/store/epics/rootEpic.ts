import { combineEpics } from "redux-observable";
import * as projectsPartEpics from "./projectsEpics";
import * as timetrackingEpics from "./timeTrackingEpics";
import * as reportEpics from "./reportsEpic";

export const rootEpics = combineEpics(
  ...(Object as any).values(projectsPartEpics),
  ...(Object as any).values(timetrackingEpics),
  ...(Object as any).values(reportEpics)
);
