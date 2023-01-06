import Modal from "@material-ui/core/Modal";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import { Box, Button, FormLabel, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { Project } from "../../../models/entities/Projects/Project";

interface IProps {
  Project: Project;
  openModal: boolean;
  isNew: boolean;
  closeModal: () => void;
}

export const ProjectsModal = (props: IProps) => {
  const [validation, setValidation] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too short")
      .max(20, "Too long"),
    description: Yup.string()
      .min(10, "Too short")
      .max(150, "Too long")
      .required("Description is required"),
  });

  return (
    <>
      <Modal
        open={props.openModal}
        onClose={() => props.closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal_container"
      >
        <Box className="modal">
          <div className="modal_title">
            <Typography id="modal-modal-title" variant="h6" component="h3">
              {!props.isNew ? "Update project" : "Create new project"}
            </Typography>
            <div className="modal_title_button"></div>
          </div>
          <Formik
            validationSchema={validationSchema}
            validateOnChange={validation}
            initialValues={{
              name: !props.isNew ? props.Project.Name : "",
              description: !props.isNew ? props.Project.Description : "",
            }}
            onSubmit={(values) => {
              setValidation(false);
              if (!props.isNew) {
                let _data = {
                  ...props.Project,
                  ...values,
                };
                props.closeModal();
                dispatch(projectsActions.updateProjectRequest_api(_data));
              } else {
                let _data = {
                  ...values,
                };
                props.closeModal();
                dispatch(projectsActions.CreateProjectRequest_api(_data));
              }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="input_container"></div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    label="name"
                    name="name"
                    error={errors.name ? true : false}
                    helperText={
                      errors.name ? (
                        <div className="error">{errors.name}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    disabled={false}
                    defaultValue={values.name}
                    variant="outlined"
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    multiline
                    error={errors.description ? true : false}
                    rows={4}
                    label="description"
                    name="name"
                    helperText={
                      errors.description ? (
                        <div className="error">{errors.description}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    disabled={false}
                    variant="outlined"
                    defaultValue={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                </div>
                <div className="modal_buttons_container">
                  <div className="PULL_LEFT">
                    <div className="button_container">
                      <Button
                        color="error"
                        variant="text"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          props.closeModal();
                          setValidation(false);
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
                        startIcon={!props.isNew ? <CheckIcon /> : <AddIcon />}
                        type="submit"
                        onClick={() => {
                          setValidation(true);
                        }}
                      >
                        {!props.isNew ? "Update" : "Create"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
