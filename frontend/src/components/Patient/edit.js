import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PrintIcon from "@material-ui/icons/Print";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from 'axios'
import moment from 'moment'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const PatientEdit = props => {
  const classes = useStyles();
  const history = useHistory();
  const showPrinter = props.showPrinter === true
  const onNewPatient = props.onNewPatient
  const isNew = props.isNew === true

  const [patientId, setPatientId] = React.useState(props.patientId)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date())
  const [address, setAddress] = React.useState("")

  const apiUrl2 = `${process.env.REACT_APP_API}Patient`
  const apiUrl = `${process.env.REACT_APP_API}Patient/${props.patientId}`

  React.useEffect(() => {
    (async () => {
      if (props.patientId === undefined) {
        return;
      }
      const patient = (await axios.get(apiUrl)).data;
      if (patient === "") { // 404
        history.push("/patients");
      }

      setPatientId(patient.patientId);
      setFirstName(patient.firstName);
      setLastName(patient.lastName);
      setGender(patient.gender);
      setDateOfBirth(patient.dateOfBirth);
      setAddress(patient.address);
    })()
  }, [props.patientId, apiUrl, history]);


  const printComponentRef = useRef();
  const printButton = (
    <ListItem button>
      <ListItemIcon>
        <PrintIcon />
      </ListItemIcon>
      <ListItemText primary="Print" />
    </ListItem>
  )

  const handleSubmit = async(e) => {
    e.preventDefault();

    let response = {}
    if (patientId === undefined) {
      // new 
      response = await axios.post(apiUrl2, {
        patientId,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        address
      })
      if (onNewPatient === undefined) {
        history.push("/patients");
      }
    } else {
      // edit
      response = await axios.put(apiUrl, {
        patientId,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        address
      })
    }
    
    if (response.data.patientId === undefined) {
      alert("Error saving.")
      return;
    }

    if (!patientId) {
      onNewPatient && onNewPatient(response.data)
    }

    alert("Patient information saved!")
  }


  const ageDifference = moment().diff(dateOfBirth, 'years')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isNew ?
            <span>New patient</span> :
            <span>Edit patient <strong>{firstName} {lastName}</strong></span>
          }
        </Typography>
        {dateOfBirth != null && ageDifference > 0 &&
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {ageDifference}
          </Typography>
        }
        <form className={classes.form} noValidate>
          <div ref={printComponentRef}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dateOfBirth"
              label="Date of birth"
              name="dateOfBirth"
              value={moment(dateOfBirth).format('yyyy-MM-DD')}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setDateOfBirth(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              value={gender}
              onChange={e => setGender(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
          { isNew ?
            <span>Create</span> :
            <span>Save changes</span>
          }
          </Button>
        </form>
      </div>
      {showPrinter && 
        <ReactToPrint
          trigger={() => printButton}
          content={() => printComponentRef.current}
        />
      }
    </Container>
  );
};

export default PatientEdit