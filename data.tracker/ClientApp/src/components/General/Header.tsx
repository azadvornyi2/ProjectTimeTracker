import * as React from "react";
import { AppBar, Box, Container, Divider, IconButton, MenuItem, Toolbar, Typography } from "@material-ui/core";
import FolderIcon from '@mui/icons-material/Folder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProjectsPage from "../Projects/ProjectsPage";
import { TimeTrackingPage } from "../TimeTracking/TimeTrackingPage";
import { NavLink, Route } from "react-router-dom";

const Header: React.FC = (props: any) => {
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <div>
                    <Typography 
                    variant="h6"
                    component="span">
                         <IconButton color="inherit">
                        <AccessTimeIcon/>
                    </IconButton>
                    Time Tracker
                    </Typography>
                    </div>
                    <Divider/>
                    <div className="header_buttons_container">
                    <MenuItem>
                    <NavLink  to = "/projects" activeStyle={{
      fontWeight: 'bold',
      color: 'red'
    }}>  
                      <Typography>PROJECTS</Typography> </NavLink>
                    </MenuItem>
                    <MenuItem>
                    <NavLink to = "/time">  
                      <Typography>REPORTS</Typography> </NavLink>
                    </MenuItem>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};

export default Header;
