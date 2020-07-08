import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import AllPatients from '../components/Patient'

const Patients = props => {
  return (
    <div>
      <Link to="/patients/new">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New patient" />
        </ListItem>
      </Link>
      <AllPatients/>
    </div>
  );
};

export default Patients