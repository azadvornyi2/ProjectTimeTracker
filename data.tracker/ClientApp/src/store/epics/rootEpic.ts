import { combineEpics } from "redux-observable";
import * as projectsPartEpics from "./projectsEpics";
import * as timetrackingEpics from "./timeTrackingEpics";

export const rootEpics = combineEpics(
  ...(Object as any).values(projectsPartEpics),
  ...(Object as any).values(timetrackingEpics)
);
