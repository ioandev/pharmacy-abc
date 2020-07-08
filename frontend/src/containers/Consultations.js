import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AllConsultations from '../components/Consultation'
import AddIcon from "@material-ui/icons/Add";

const Consultations = props => {
  return (
    <div>
      <Link to="/consultations/new">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New consultation" />
        </ListItem>
      </Link>
      <AllConsultations/>
    </div>
  );
};

export default Consultations