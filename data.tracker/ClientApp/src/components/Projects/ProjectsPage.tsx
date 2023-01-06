import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, FormLabel, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { projectsActions } from "../../store/reducers/ProjectReducer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project } from "../../models";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProjectsModal } from "./components/ProjectsModal";
import { ProjectsTable } from "./components/ProjectsTable";
import CloseIcon from "@mui/icons-material/Close";

const ProjectsPage: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  return (
    <>
      <div>
        <h1>Projects</h1>
        <div className="control_buttons_container">
          <Tooltip title="Add new project" aria-label="add">
            <Button
              variant="text"
              startIcon={<AddIcon />}
              type="submit"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {"New Project"}
            </Button>
          </Tooltip>
        </div>
        <ProjectsTable />
      </div>
      <ProjectsModal
        Project={undefined}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        isNew={true}
      />
    </>
  );
};

export default ProjectsPage;
