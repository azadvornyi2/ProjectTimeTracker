import * as React from "react";
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

interface IProps {
  projects: any[];
  isModalCalled: boolean;
  setIsModalCalled: () => void;
  selected: any;
}

export const AddSpendTimeModal = (props: IProps) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [timeRegister, setTimeRegister] = useState<TimeRegister>();

  const tryParseDate = (date: string) => {
    return new Date(date ?? "");
  };
  return (
    <>
      <Modal
        open={props.isModalCalled}
        onClose={() => {
          props.setIsModalCalled();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Formik
            initialValues={
              props.selected
                ? {
                    project: undefined,
                    projectId: props.selected.projectId,
                    startTime: props.selected.starts,
                    endTime: props.selected.ends,
                    Note: props.selected.notes,
                  }
                : {}
            }
            onSubmit={(values) => {
              let _data: TimeRegister = {
                ...values,
                ...props.selected,
              };

              if (props.isNew) {
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
                    name="startTime"
                    label="Start Time"
                    variant="outlined"
                    defaultValue={props.selected.starts}
                    type="datetime-local"
                    onChange={(e) => setFieldValue("Starts", e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="input_container">
                  <TextField
                    fullWidth
                    id="Ends"
                    name="endTime"
                    label="End Time"
                    defaultValue={props.selected.ends}
                    variant="outlined"
                    type="datetime-local"
                    onChange={(e) => setFieldValue("Ends", e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
