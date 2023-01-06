import * as React from "react";
import { useEffect } from "react";
import { Box, Button, FormLabel } from "@mui/material";
import { trackedTimeActions } from "../../../store/reducers/timeTrackingReducer";
import { TimeRegister } from "../../../models/entities/TimeTracking/TimeRegister";
import Modal from "@material-ui/core/Modal";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { List } from "linq-typescript";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { CalculateHoursDifference } from "../../../helpers";
import * as Yup from "yup";

interface IProps {
  projects: any[];
  isModalCalled: boolean;
  setIsModalCalled: () => void;
  selected: any;
}

export const AddSpendTimeModal = (props: IProps) => {
  const dispatch = useDispatch();

  const [timeDifference, setTimeDifference] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    let _hoursDiff: number = CalculateHoursDifference(startTime, endTime);
    if (Number.isInteger(_hoursDiff) && _hoursDiff > 0) {
      setTimeDifference(CalculateHoursDifference(startTime, endTime));
    }
  }, [startTime, endTime]);

  const validationSchema = Yup.object().shape({
    startTime: Yup.date()
      .required("Start date required")
      .max(endTime, "End date cannot be greater than end date"),

    endTime: Yup.date()
      .min(startTime, "End date may be greater then start date")
      .required("End date required"),

    duration: Yup.number()
      .min(1, "Duration must be greater then 1")
      .max(8, "Duration must be lower than 8")
      .integer("Duration must be integer"),

    Notes: Yup.string()
      .min(10, "Too short")
      .max(150, "Too long")
      .required("Required"),
  });

  return (
    <>
      <Modal
        className="modal_container"
        open={props.isModalCalled}
        onClose={() => {
          props.setIsModalCalled();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize={true}
            initialValues={
              props.selected
                ? {
                    project: undefined,
                    projectId: props.selected.projectId,
                    startTime: props.selected.starts,
                    endTime: props.selected.ends,
                    Note: props.selected.notes,
                    duration: props.selected.duration,
                  }
                : {
                    startTime: new Date(),
                    endTime: new Date(),
                  }
            }
            onSubmit={(values) => {
              let _data: TimeRegister = {
                ...values,
                ...props.selected,
              };

              if (props.selected.Id > 0) {
                let _data = {
                  ...props.selected,
                  ...values,
                };
                dispatch(
                  trackedTimeActions.updateRegiseredTimeRequest_api(_data)
                );
                props.setIsModalCalled();
              } else {
                let _data: TimeRegister = {
                  ...values,
                  ProjectId: values.project.Id,
                  Starts: startTime,
                  Ends: endTime,
                };
                dispatch(trackedTimeActions.registerTimeRequest_api(_data));
                props.setIsModalCalled();
              }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="input_container">
                  <FormLabel>
                    {props.selected.Id > 0
                      ? "Update existing time"
                      : "Register spend time"}
                  </FormLabel>
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    id="Starts"
                    helperText={<div className="error">{errors.startTime}</div>}
                    name="startTime"
                    label="Start Time"
                    variant="outlined"
                    defaultValue={props.selected.starts}
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {startTime}
                  </TextField>
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    id="Ends"
                    helperText={<div className="error">{errors.endTime}</div>}
                    name="endTime"
                    label="End Time"
                    defaultValue={props.selected.ends}
                    variant="outlined"
                    type="datetime-local"
                    onChange={(e: any) => {
                      setFieldValue("endTime", e.target.value),
                        setEndTime(e.target.value),
                        values.startTime
                          ? setTimeDifference(
                              CalculateHoursDifference(
                                values.startTime,
                                values.endTime
                              )
                            )
                          : setTimeDifference(0);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    id="Duration"
                    name="duration"
                    helperText={<div className="error">{errors.duration}</div>}
                    label="Duration"
                    disabled={true}
                    value={timeDifference >= 1 ? timeDifference : 0}
                    defaultValue={
                      values.endTime && values.startTime
                        ? CalculateHoursDifference(
                            values.startTime,
                            values.endTime
                          )
                        : timeDifference
                    }
                    variant="outlined"
                    onChange={(e) => setFieldValue("duration", e.target.value)}
                  />
                </div>
                <FormControl fullWidth>
                  <InputLabel variant="outlined">Projects</InputLabel>
                  <Select
                    variant="outlined"
                    value={
                      values.project && values.project.Id > 0
                        ? values.project.Id
                        : props.selected.projectId
                    }
                    label="demo-simple-select-label"
                    onChange={(item) => {
                      let _s = new List(props.projects)
                        .where((x) => x.Id === item.target.value)
                        .toArray();

                      if (_s.length > 0) {
                        setFieldValue("project", _s[0]);
                      }
                    }}
                  >
                    {props.projects.map((item) => {
                      return (
                        <MenuItem key={item.Id} value={item.Id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <div className="input_container">
                  <TextField
                    className="textarea"
                    variant="outlined"
                    label="notes"
                    name="Notes"
                    defaultValue={props.selected.notes}
                    disabled={false}
                    multiline
                    helperText={<div className="error">{errors.Notes}</div>}
                    rows={4}
                    onChange={(e) => setFieldValue("Notes", e.target.value)}
                  />
                </div>
                <div className="row_container">
                  <div className="pull__RIGHT">
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={
                        props.selected.Id > 0 ? <CheckIcon /> : <AddIcon />
                      }
                    >
                      {props.selected.Id > 0 ? "Update" : "Create"}
                    </Button>
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
