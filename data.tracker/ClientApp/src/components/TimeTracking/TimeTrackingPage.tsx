import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { projectsActions } from "../../store/reducers/ProjectReduser";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project, TimeRegister } from "../../models";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { List } from "linq-typescript";

const TimeTrackingPage: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector<IAppState, any[]>(
    (state) => state.projects.projects
  );

  const [selected, setSelected] = React.useState<any>(new Project());
  const [isNew, setIsNew] = React.useState<boolean>(false);

  useEffect(() => {
    if (selected.id > 0) {
      setSelected(new Project());
    }
  }, [projects]);

  useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            setSelected(params.row);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch(
              projectsActions.updateProjectRequest_api({
                ...params.row,
                deleted: true,
              })
            );
          }}
        >
          Remove
        </Button>
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Project Name",
      editable: false,
      width: 600,
    },
    {
      field: "button",
      headerName: " ",
      sortable: false,
      width: 320,
      filterable: false,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <>
      <div>
        <h1>Time</h1>
        <Button
          onClick={() => {
            setIsNew(true);
          }}
        >
          {"Create"}
        </Button>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={projects}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>

      <Modal
        open={selected.id > 0 || isNew}
        onClose={() => {
          setIsNew(false);
          setSelected(new Project());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Formik
            initialValues={{
              project: undefined,
              from: new Date(),
              to: new Date(),
            }}
            onSubmit={(values) => {
              let _data: TimeRegister = {
                Duration: 1,
                Ends: values.to,
                Starts: values.from,
                Project: values.project,
                ProjectId: values.project.id,
              };
              debugger;

              //   dispatch(projectsActions.CreateProjectRequest_api(_data));

              //   if (selected.id > 0) {
              //     let _data = {
              //       ...selected,
              //       ...values,
              //     };

              //     dispatch(projectsActions.updateProjectRequest_api(_data));
              //   } else {
              //     let _data = {
              //       ...values,
              //     };

              //     dispatch(projectsActions.CreateProjectRequest_api(_data));
              //     setIsNew(false);
              //   }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <TextField
                  label="from"
                  name="from"
                  disabled={false}
                  defaultValue={values.from}
                  onChange={(e) => setFieldValue("from", e.target.value)}
                />

                <TextField
                  label="to"
                  name="to"
                  disabled={false}
                  defaultValue={values.to}
                  onChange={(e) => setFieldValue("to", e.target.value)}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    projects
                  </InputLabel>
                  <Select
                    value={values.project ? values.project.id : ""}
                    label="name"
                    onChange={(item) => {
                      let _s = new List(projects)
                        .where((x) => x.id === item.target.value)
                        .toArray();
                      debugger;
                      if (_s.length > 0) {
                        setFieldValue("project", _s[0]);
                      }
                    }}
                  >
                    {projects.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {/* projects */}

                <div className="row_container">
                  <div className="pull__RIGHT">
                    <Button type="submit">
                      {selected.id > 0 ? "Update" : "Create"}
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

export default TimeTrackingPage;
