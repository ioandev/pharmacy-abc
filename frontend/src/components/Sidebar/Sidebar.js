import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import SubjectIcon from "@material-ui/icons/Subject";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    top: theme.spacing(8),
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
});

const Sidebar = props => {
  const { open, classes } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <List>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/consultations" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary="Consultations" />
          </ListItem>
        </Link>
        <Link to="/patients" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItem>
        </Link>
        <Link to="/stats" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Stats" />
          </ListItem>
        </Link>
        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
