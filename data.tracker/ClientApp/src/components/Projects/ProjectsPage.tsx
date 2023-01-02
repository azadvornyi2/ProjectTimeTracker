
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { projectsActions } from "../../store/reducers/ProjectReduser";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, Project } from "../../models";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, Field } from "formik"
import TextField from "@material-ui/core/TextField";

const ProjectsPage: React.FC = () => {

    const dispatch = useDispatch();
    const projects = useSelector<IAppState, any[]>((state) => state.projects.projects);



    const [selected, setSelected] = React.useState<any>(new Project());
    const [isNew, setIsNew] = React.useState<boolean>(false);

    useEffect(() => {
        if (selected.id > 0) {
            setSelected(new Project())
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

                        setSelected(params.row)
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size = "small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        ;
                        dispatch(projectsActions.updateProjectRequest_api({...params.row,deleted:true}))
                    }}
                >
                    Remove
                </Button>
            </strong>
        )
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Project Name',
            editable: false,
            width: 600,
        },
        {
            field: 'description',
            headerName: 'Project Description',
            width: 800,
            editable: false,
        },
        {
            field: 'button',
            headerName: ' ',
            sortable: false,
            width: 320,
            filterable: false,
            renderCell: renderDetailsButton,
        },
    ];

    return (
        <>
            <div>
                <h1>Projects</h1>
                <Button onClick={()=>{setIsNew(true)}}>
                                            {"Create"}
                                        </Button>
                <Box sx={{ height: 400, width: '100%' }}>
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
                open={selected.id > 0  || isNew}
                onClose={() => { 
                    setIsNew(false);   
                    setSelected(new Project())}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal">

                    <Formik
                        initialValues={{
                            name: selected.name ? selected.name : '',
                            description: selected.description ? selected.description : '',
                        }}
                        onSubmit={(values) => {
if(selected.id > 0){

    let _data = {
        ...selected,
        ...values,

    }

    dispatch(projectsActions.updateProjectRequest_api(_data));
}else{

    let _data = {
        ...values
    }

    dispatch(projectsActions.CreateProjectRequest_api(_data));
    setIsNew(false);

}


                            
                        }}>
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form>
                                <TextField
                                    label="name"
                                    name="name"
                                    disabled={false}
                                    defaultValue={values.name}
                                    onChange={(e) => setFieldValue('name', e.target.value)}
                                />

                                <TextField
                                    label="description"
                                    name="name"
                                    disabled={false}
                                    defaultValue={values.description}
                                    onChange={(e) => setFieldValue('description', e.target.value)}
                                />

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

export default ProjectsPage;


