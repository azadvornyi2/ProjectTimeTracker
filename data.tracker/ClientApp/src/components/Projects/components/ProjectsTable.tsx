import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project } from "../../../models";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProjectsModal } from "./ProjectsModal";
import { RemoveConfirmation } from "./RemoveConfirmationAlert";

export const ProjectsTable = () => {
  const dispatch = useDispatch();

  const projects = useSelector<IAppState, Project[]>(
    (state) => state.projects.projects
  );

  const [projectsTable, setProjectsTable] = React.useState([]);
  const [selected, setSelected] = React.useState<Project>(new Project());
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [removeConfirmation, setRemoveConfirmation] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (selected.Id > 0) {
      setSelected(new Project());
    }
    if (projects) {
      setProjectsTable(
        projects.map((project) => {
          return {
            ...project,
            id: project.Id,
          };
        })
      );
    }
  }, [projects]);

  useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Tooltip title="Edit" aria-label="edit">
          <IconButton
            style={{ marginLeft: 16 }}
            color="primary"
            onClick={() => {
              setOpenModal(true);
              setSelected(params.row);
            }}
          >
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove" aria-label="remove">
          <IconButton
            style={{ marginLeft: 16 }}
            color="error"
            onClick={() => {
              setSelected(params.row);
              setRemoveConfirmation(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: "Id", headerName: "ID", width: 90 },
    {
      field: "Name",
      headerName: "Project Name",
      align: "center",
      headerAlign: "center",
      editable: false,
      width: 600,
    },
    {
      field: "Description",
      headerName: "Project Description",
      align: "center",
      headerAlign: "center",
      width: 800,
      editable: false,
    },
    {
      field: "button",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 320,
      filterable: false,
      renderCell: renderDetailsButton,
    },
  ];

  console.log(projectsTable);
  return (
    <>
      <Box sx={{ height: 750, width: "100%" }}>
        <DataGrid
          rows={projectsTable}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <ProjectsModal
        Project={selected}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        isNew={false}
      />
      <RemoveConfirmation
        IsOpenForm={removeConfirmation}
        CloseDialog={() => setRemoveConfirmation(false)}
        Project={selected}
      />
    </>
  );
};
