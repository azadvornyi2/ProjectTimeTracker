import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import NotFoundPage from "./General/NotFound/NotFoundPage";
import ProjectsPage from "./Projects/ProjectsPage";
import TimeTrackingPage from "./TimeTracking/TimeTrackingPage";

const AppRoutings: React.FC<any> = (props: any) => {
  return (
    <Switch>
      <Route path={`/projects`} component={ProjectsPage} />
      <Route path={`/time`} component={TimeTrackingPage} />
      <Route path={`/not-found`} component={NotFoundPage} />
      <Redirect exact from="/" to={`/projects`} />
      <Redirect from="*" to={`/not-found`} />
    </Switch>
  );
};

export default AppRoutings;
