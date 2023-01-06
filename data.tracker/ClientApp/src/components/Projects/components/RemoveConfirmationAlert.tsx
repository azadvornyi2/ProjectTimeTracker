import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Project } from "../../../models";

interface IProps {
  Project: Project;
  IsOpenForm: boolean;
  CloseDialog: () => void;
}
export const RemoveConfirmation = (props: IProps) => {
  const dispatch = useDispatch();
  let _project: Project = { ...props.Project, Deleted: true };
  return (
    <Modal
      onClose={() => props.CloseDialog()}
      open={props.IsOpenForm}
      className="modal_container"
    >
      <Box className="modal">
        <div className="modal_title">
          <Typography id="modal-modal-title" variant="h6" component="h1">
            {"Are you sure?"}
          </Typography>
        </div>
        <div className="modal_remove_helper">
          {
            "Do you really want to deleted this project? This process cannot be undone."
          }
        </div>

        <div className="modal_buttons_container">
          <div className="PULL_LEFT">
            <div className="button_container">
              <Button
                color="info"
                variant="text"
                startIcon={<CloseIcon />}
                onClick={() => {
                  props.CloseDialog();
                }}
              >
                {"cancel"}
              </Button>
            </div>
          </div>
          <div className="PULL_LEFT">
            <div className="button_container">
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  dispatch(projectsActions.updateProjectRequest_api(_project));
                  props.CloseDialog();
                }}
              >
                {"Remove"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
