import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { trackedTimeActions } from "../../../store/reducers/timeTrackingReducer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project, TimeRegister } from "../../../models";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddSpendTimeModal } from "./AddSpendTimeModal";
import { Tooltip } from "@material-ui/core";
import { TimeRemoveAlert } from "./TimeRemoveAlert";
import { TimeTrackingModal } from "./TimeTrackingModal";

const RegisteredTimeTable = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState<TimeRegister>(
    new TimeRegister()
  );
  const [isModalCalled, setIsModalCalled] = React.useState<boolean>(false);
  const [isDeleteCalled, setIsDeleteCalled] = React.useState<boolean>(false);
  const [trackedTimeTable, setTrackedTimeTable] = React.useState([]);

  const registeredTime = useSelector<IAppState, TimeRegister[]>(
    (state) => state.trackedTime.trackedTime
  );

  const projects = useSelector<IAppState, Project[]>(
    (state) => state.projects.projects
  );

  useEffect(() => {
    dispatch(trackedTimeActions.getAllRegisteredTimeRequest_api());
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  useEffect(() => {
    if (registeredTime) {
      setTrackedTimeTable(
        registeredTime.map((trackedTime) => {
          return {
            ...trackedTime,
            id: trackedTime.Id,
          };
        })
      );
    }
  }, [registeredTime]);

  const renderDetailsButton = (params) => {
    return (
      <>
        <strong>
          <Tooltip title="Update register" aria-label="update">
            <IconButton
              color="primary"
              style={{ marginLeft: 16 }}
              onClick={() => {
                setSelected(params.row);
                setIsModalCalled(true);
              }}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove" aria-label="remove">
            <IconButton
              color="error"
              style={{ marginLeft: 16 }}
              onClick={() => {
                setSelected(params.row);
                setIsDeleteCalled(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </strong>
      </>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "Id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Starts",
      headerName: "Date start",
      editable: false,
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Ends",
      headerName: "Date end",
      editable: false,
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Duration",
      headerName: "Duration",
      editable: false,
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ProjectName",
      headerName: "Project Name",
      editable: false,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Notes",
      headerName: "Notes",
      editable: false,
      width: 500,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "button",
      headerName: "Actions",
      sortable: false,
      width: 150,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <>
      <Box sx={{ height: 750, width: "100%" }}>
        <DataGrid
          rows={trackedTimeTable}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <TimeRemoveAlert
        alertClose={() => setIsDeleteCalled(false)}
        alertOpen={isDeleteCalled}
        timeRegister={selected}
      />
      <TimeTrackingModal
        closeModal={() => setIsModalCalled(false)}
        isNew={false}
        openModal={isModalCalled}
        timeRegister={selected}
      />
      {/* <AddSpendTimeModal
        projects={projects}
        isModalCalled={isModalCalled}
        selected={selected}
        setIsModalCalled={() => setIsModalCalled(false)}
      /> */}
    </>
  );
};

export default RegisteredTimeTable;
