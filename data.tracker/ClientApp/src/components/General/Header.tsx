import * as React from "react";
import {
  AppBar,
  Divider,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { Button } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Header: React.FC = (props: any) => {
  return (
    <React.Fragment>
      <AppBar className="header">
        <Toolbar className="header">
          <div>
            <Typography variant="h6" component="span" className="header_label">
              Time Tracker
            </Typography>
          </div>
          <Divider />

          <div className="header_buttons_container">
            <NavLink
              to="/projects"
              color="white"
              className="nav_link_component"
              activeClassName="nav_link_component_active"
            >
              <Button
                color="inherit"
                startIcon={<BookmarksIcon />}
                size="large"
              >
                PROJECTS
              </Button>
            </NavLink>
            <NavLink
              to="/time"
              color="white"
              className="nav_link_component"
              activeClassName="nav_link_component_active"
            >
              <Button
                color="inherit"
                startIcon={<AccessTimeIcon />}
                size="large"
              >
                TRACKING
              </Button>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
