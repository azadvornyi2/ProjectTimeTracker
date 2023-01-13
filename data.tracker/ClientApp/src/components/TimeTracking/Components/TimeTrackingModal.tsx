import Modal from "@material-ui/core/Modal";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { Project } from "../../../models/entities/Projects/Project";
import { IAppState, TimeDifference, TimeRegister } from "../../../models";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { CalculateHoursDifference } from "../../../helpers";
import { trackedTimeActions } from "../../../store/reducers/timeTrackingReducer";
import { List } from "linq-typescript";
import { timeDifferenceActions } from "../../../store/reducers";

interface IProps {
  timeRegister: TimeRegister;
  openModal: boolean;
  isNew: boolean;
  closeModal: () => void;
}

export const TimeTrackingModal = (props: IProps) => {
  const [validation, setValidation] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const [valueStartDate, setValueStartDate] = React.useState(
    new Date().toISOString()
  );
  const [valueEndDate, setValueEndDate] = React.useState(
    new Date().toISOString()
  );

  const setStartDate = (start: any) => {
    if (!start || start === "") return;
    else {
      setValueStartDate(start);
    }
  };

  const setEndDate = (end: any) => {
    if (!end || end === "") return;
    else setValueEndDate(end);
  };

  const projects = useSelector<IAppState, Project[]>(
    (state) => state.projects.projects
  );

  const difference = useSelector<IAppState, number>(
    (state) => state.timeDifference.timeDifference
  );

  React.useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  const validationSchema = Yup.object().shape({
    starts: Yup.date()
      .required("Start Time is required")
      .max(valueEndDate, "The start date cannot be greater than the end date"),

    ends: Yup.date()
      .required("EndTime Time is required")
      .min(valueStartDate, "The end date cannot be lowwer than the start date"),

    project: Yup.string().required("Project is required"),

    hours: Yup.number().min(1, "Hours count cannot be less than 1"),

    notes: Yup.string().required("Notes is required"),
  });

  const OnFormClosing = () => {
    props.closeModal();
    dispatch(timeDifferenceActions.setHoursDifference(0));
    setStartDate(new Date().toISOString());
    setEndDate(new Date().toISOString());
    setValidation(false);
  };

  return (
    <>
      <Modal
        open={props.openModal}
        onClose={() => OnFormClosing()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal_container"
      >
        <Box className="modal">
          <div className="modal_title">
            <Typography id="modal-modal-title" variant="h6" component="h3">
              {!props.isNew ? "Update time" : "Register time"}
            </Typography>
          </div>
          <Formik
            validationSchema={validationSchema}
            validateOnChange={validation}
            initialValues={
              props.isNew
                ? {
                    starts: new Date().toISOString().slice(0, -8),
                    ends: new Date().toISOString().slice(0, -8),
                    notes: "",
                  }
                : {
                    starts: props.timeRegister.Starts,
                    ends: props.timeRegister.Ends,
                    projectId: props.timeRegister.ProjectId,
                    project: undefined,
                    notes: props.timeRegister.Notes,
                  }
            }
            onSubmit={(values) => {
              setValidation(false);
              const data = Object.assign({}, props.timeRegister, {
                Starts: values.starts,
                Ends: values.ends,
                ProjectId: values.project.Id,
                Notes: values.notes,
              } as TimeRegister);
              if (props.isNew) {
                dispatch(trackedTimeActions.registerTimeRequest_api(data));
              } else {
                dispatch(
                  trackedTimeActions.updateRegiseredTimeRequest_api(data)
                );
              }
              props.closeModal();
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="input_container"></div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    label="Start time"
                    name="starts"
                    defaultValue={values.starts}
                    onChange={(e: any) => {
                      setFieldValue("starts", e.target.value),
                        setStartDate(e.target.value);
                    }}
                    type="datetime-local"
                    error={errors.starts ? true : false}
                    helperText={
                      errors.starts ? (
                        <div className="error">{errors.starts}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    disabled={false}
                    value={values.starts}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    label="End time"
                    name="ends"
                    type="datetime-local"
                    error={errors.ends ? true : false}
                    helperText={
                      errors.ends ? (
                        <div className="error">{errors.ends}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    disabled={false}
                    defaultValue={values.ends}
                    onChange={(e: any) => {
                      setFieldValue("ends", e.target.value),
                        setEndDate(e.target.value);
                    }}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="input_container">
                  <FormControl fullWidth>
                    <InputLabel className="select_lable">Project</InputLabel>
                    <Select
                      variant="outlined"
                      name="Project"
                      error={errors.project ? true : false}
                      label={"Project"}
                      defaultValue={values.project}
                      onChange={(item) => {
                        let _s = new List(projects)
                          .where((x) => x.Id === item.target.value)
                          .toArray();

                        if (_s.length > 0) {
                          setFieldValue("project", _s[0]);
                        }
                      }}
                    >
                      {projects.map((item) => {
                        return (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {errors.project ? (
                        <div className="error_select">{errors.project}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    multiline
                    error={errors.notes ? true : false}
                    rows={4}
                    label="Notes"
                    name="notes"
                    helperText={
                      errors.notes ? (
                        <div className="error">{errors.notes}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    disabled={false}
                    variant="outlined"
                    defaultValue={values.notes}
                    onChange={(e) => setFieldValue("notes", e.target.value)}
                  />
                </div>
                <div className="input_container">
                  <Typography id="modal-modal-title" component="div">
                    {"Duration: " + Math.round(difference) + " hours"}
                  </Typography>
                </div>
                <div className="modal_buttons_container">
                  <div className="PULL_LEFT">
                    <div className="button_container">
                      <Button
                        color="error"
                        variant="text"
                        startIcon={<CloseIcon />}
                        onClick={() => OnFormClosing()}
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
                        {!props.isNew ? "Update" : "Register"}
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
