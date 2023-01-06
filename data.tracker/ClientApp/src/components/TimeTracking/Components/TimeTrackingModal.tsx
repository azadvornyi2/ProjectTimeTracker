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
import { IAppState, TimeRegister } from "../../../models";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { CalculateHoursDifference } from "../../../helpers";
import { trackedTimeActions } from "../../../store/reducers/timeTrackingReducer";
import { List } from "linq-typescript";

interface IProps {
  timeRegister: TimeRegister;
  openModal: boolean;
  isNew: boolean;
  closeModal: () => void;
}

export const TimeTrackingModal = (props: IProps) => {
  const [validation, setValidation] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const [valueStartDate, setValueStartDate] = React.useState<Date>(new Date());
  const [valueEndDate, setValueEndDate] = React.useState(new Date());
  const [timeDifference, setTimeDifference] = React.useState(0);
  const [timeRegister, setTimeRegister] = React.useState<TimeRegister>(new TimeRegister)

  React.useEffect(() => {
    setTimeDifference(CalculateHoursDifference(valueStartDate, valueEndDate));
  }, [valueStartDate, valueEndDate]);

  const setStartDate = (start: any) => {
    if (!start || start === "") return;
    else setValueStartDate(start);
  };

  const setEndDate = (end: any) => {
    debugger;
    if (!end || end === "") return;
    else setValueEndDate(end);
  };

  const projects = useSelector<IAppState, Project[]>(
    (state) => state.projects.projects
  );

  React.useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  React.useEffect(() => {
    debugger;
    if (props.timeRegister.Starts && props.timeRegister.Ends) {
      setValueStartDate(props.timeRegister.Starts);
      setValueEndDate(props.timeRegister.Ends);
    }
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, [props.timeRegister]);

  let _timeRegister: TimeRegister = props.timeRegister;

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
              setTimeRegister(...timeRegister, new TimeRegister: {
              })


              if (!props.isNew) {
                debugger;
                let _data = {
                  ...values,
                  ...ProjectId: values.project.Id,
                };
                props.closeModal();
                dispatch(
                  trackedTimeActions.updateRegiseredTimeRequest_api(_data)
                );
              } else {
                let _data = {
                  ...values,
                };
                props.closeModal();
                dispatch(trackedTimeActions.registerTimeRequest_api(_data));
              }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="input_container"></div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    label="Start time"
                    name="Starts"
                    defaultValue={values.starts}
                    onChange={(e: any) => {
                      setFieldValue("Starts", e.target.value),
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
                    name="Ends"
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
                      setFieldValue("Ends", e.target.value),
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
                    name="Notes"
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
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                </div>
                <div className="input_container">
                  <Typography id="modal-modal-title" component="div">
                    {"Duration: " + Math.round(timeDifference) + " hours"}
                  </Typography>
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
