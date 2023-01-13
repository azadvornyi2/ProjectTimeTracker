import Modal from "@material-ui/core/Modal";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  Button,
  FormLabel,
  TextFieldProps,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsActions } from "../../../store/reducers/ProjectReducer";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import CreateIcon from "@mui/icons-material/Create";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { IAppState, Project } from "../../../models";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { List } from "linq-typescript";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { reportActions } from "../../../store/reducers";

interface IProps {
  openModal: boolean;
  closeModal: () => void;
  openReport: () => void;
}

export const GenerateReportModal = (props: IProps) => {
  const dispatch = useDispatch();

  const projects = useSelector<IAppState, Project[]>(
    (state) => state.projects.projects
  );

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

  const [allProjects, setAllProjects] = React.useState<boolean>(true);
  const [allProjectTime, setallProjectTime] = React.useState<boolean>(false);

  const [validation, setValidation] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  const validationSchema = Yup.object().shape({
    dateStarts: Yup.date()
      .required("This date is required")
      .max(valueEndDate, "The start date cannot be greater than the end date"),

    dateEnds: Yup.date()
      .required("This date is required")
      .min(valueStartDate, "The end date cannot be less than the initial date"),
  });

  const handleAllProjectsSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllProjects(event.target.checked ? true : false);
  };

  const handleAllTimeSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setallProjectTime(event.target.checked ? true : false);
  };

  const validationSchemaWithProject = Yup.object().shape({
    dateStarts: Yup.date()
      .required("This date is required")
      .max(valueEndDate, "The start date cannot be greater than the end date"),

    dateEnds: Yup.date()
      .required("This date is required")
      .min(valueStartDate, "The end date cannot be less than the initial date"),
    project: Yup.string().required("Project is required"),
  });

  const validationSchemaWithoutTime = Yup.object().shape({
    project: Yup.string().required("Project is required"),
  });

  const validationSchemaSelector = () => {
    if (allProjects) {
      return validationSchema;
    } else {
      if (allProjectTime) {
        return validationSchemaWithoutTime;
      } else return validationSchemaWithProject;
    }
  };

  const reportActionSelector = (data: any) => {
    if (allProjects) {
      return dispatch(reportActions.getHoursRange(data));
    } else {
      if (allProjectTime) {
        return dispatch(reportActions.getAllProjectHoursRequest_api(data));
      } else return dispatch(reportActions.getRangeProjectHours(data));
    }
  };

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
              {"Generate a new Report"}
            </Typography>
            <div className="modal_title_button"></div>
          </div>
          <Formik
            validationSchema={validationSchemaSelector()}
            enableReinitialize={true}
            validateOnChange={validation}
            initialValues={{}}
            onSubmit={(values) => {
              setValidation(false);

              let _data = {
                ...values,
              };
              reportActionSelector(_data);
              props.closeModal();
              setTimeout(props.openReport, 1000);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="input_container">
                  <TextField
                    fullWidth
                    label="Start time"
                    name="dateStarts"
                    onChange={(e: any) => {
                      setFieldValue("dateStarts", e.target.value),
                        setValueStartDate(e.target.value);
                    }}
                    error={errors.dateStarts ? true : false}
                    helperText={
                      errors.dateStarts ? (
                        <div className="error">{errors.dateStarts}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    type="date"
                    disabled={allProjectTime}
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
                    name="dateEnds"
                    onChange={(e: any) => {
                      setFieldValue("dateEnds", e.target.value),
                        setValueEndDate(e.target.value);
                    }}
                    error={errors.dateEnds ? true : false}
                    helperText={
                      errors.dateEnds ? (
                        <div className="error">{errors.dateEnds}</div>
                      ) : (
                        <div className="helper_text">{"*"}</div>
                      )
                    }
                    type="date"
                    disabled={allProjectTime}
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
                      disabled={allProjects}
                      variant="outlined"
                      name="Project"
                      error={errors.project ? true : false}
                      label={"Project"}
                      // defaultValue={values.project}
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
                <div className="input_container_switch">
                  <FormControlLabel
                    disabled={allProjectTime}
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        checked={allProjects}
                        onChange={handleAllProjectsSwitchChange}
                      />
                    }
                    label="Report on all projects"
                    // labelPlacement="start"
                  />
                </div>
                <div className="input_container_switch">
                  <FormControlLabel
                    disabled={allProjects}
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        checked={allProjectTime}
                        onChange={handleAllTimeSwitchChange}
                      />
                    }
                    label="All the time of the project"
                    // labelPlacement="start"
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
                        startIcon={<CreateIcon />}
                        type="submit"
                        onClick={() => {
                          setValidation(true);
                        }}
                      >
                        {"Generate"}
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
