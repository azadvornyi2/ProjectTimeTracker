import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { trackedTimeActions } from "../../store/reducers/timeTrackingReducer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project, TimeRegister } from "../../models";
import { projectsActions } from "../../store/reducers/ProjectReducer";
import ButtonsBar from "./Components/ButtonsBar";
import { AddSpendTimeModal } from "./Components/AddSpendTimeModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import RegisteredTimeTable from "./Components/RegisteredTimeTable";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const TimeTrackingPage = () => {
  const dispatch = useDispatch();

  const registeredTime = useSelector<IAppState, any[]>(
    (state) => state.trackedTime.trackedTime
  );

  const projects = useSelector<IAppState, any[]>(
    (state) => state.projects.projects
  );

  const [selected, setSelected] = React.useState<any>(new Project());
  const [isModalCalled, setIsModalCalled] = React.useState<boolean>(false);

  useEffect(() => {
    if (registeredTime) {
    }
  }, [registeredTime]);

  useEffect(() => {
    dispatch(trackedTimeActions.getAllRegisteredTimeRequest_api());
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  return (
    <>
      <div>
        <h1>Time</h1>
        <ButtonsBar
          addButtonClick={() => setIsModalCalled(true)}
          reportButtonClick={() => {}}
        />
        <RegisteredTimeTable />

        <AddSpendTimeModal
          projects={projects}
          isModalCalled={isModalCalled}
          selected={selected}
          setIsModalCalled={() => setIsModalCalled(false)}
        />
      </div>
    </>
  );
};

export default TimeTrackingPage;
