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
import Moment from 'react-moment';

import PatientSingle from '../Patient/single'

import Modal from '@material-ui/core/Modal';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import PrintIcon from "@material-ui/icons/Print";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PatientSearch from '../Patient/search'
import NewPatient from '../Patient/edit'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import moment from 'moment'
import {concatenateName} from '../Helpers'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper2: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  const apiUrl2 = `${process.env.REACT_APP_API}Consultation`
  const apiUrl = `${process.env.REACT_APP_API}Consultation/${props.consultationId}`
  const isNew = props.isNew === true

  const [consultationId, setConsultationId] = React.useState(props.consultationId)
  const [amount, setAmount] = React.useState(10.0)
  const [occurredAt, setOccurredAt] = React.useState(new Date())
  const [symptoms, setSymptoms] = React.useState("")
  const [medications, setMedications] = React.useState("")
  const [advice, setAdvice] = React.useState("")
  const [comments, setComments] = React.useState("")
  const [patient, setPatient] = React.useState({})
  
  const printComponentRef = useRef();
  const printButton = (
    <ListItem button>
      <ListItemIcon>
        <PrintIcon />
      </ListItemIcon>
      <ListItemText primary="Print" />
    </ListItem>
  )

  const [modalStyle] = React.useState(getModalStyle);
  const [isNewPatient, setIsNewPatient] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleNewPatientOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onNewPatient = (patient) => {
    setPatient(patient)
    setIsNewPatient(true)
    handleClose()
  }

  React.useEffect(() => {
    (async () => {
      if (props.consultationId === undefined) {
        return;
      }
      const consultation = (await axios.get(apiUrl)).data;
      if (consultation === "") { // 404
        history.push("/consultations");
      }

      setConsultationId(consultation.consultationId)
      setAmount(consultation.amount)
      setOccurredAt(consultation.occurredAt)
      setSymptoms(consultation.symptoms)
      setMedications(consultation.medications)
      setAdvice(consultation.advice)
      setComments(consultation.comments)
      setPatient(consultation.patient)
    })()
  }, [props.consultationId, apiUrl, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = {}
    if (consultationId === undefined) {
      // new 
      response = await axios.post(apiUrl2, {
        consultationId,
        amount: parseFloat(amount),
        occurredAt,
        symptoms,
        medications,
        advice,
        comments,
        patientId: patient.patientId
      })
      history.push("/consultations");
    } else {
      // edit
      response = await axios.put(apiUrl, {
        consultationId,
        amount: parseFloat(amount),
        occurredAt,
        symptoms,
        medications,
        advice,
        comments,
        patient
      })
    }

    if (response.data.consultationId === undefined) {
      alert("Error saving.")
      return;
    }

    alert("Consultation saved!")
  }

  const body = (
    <div style={modalStyle} className={classes.paper2}>
      <NewPatient onNewPatient={onNewPatient}/>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        { isNew ?
          <span>New consultation</span> :
          <span>Edit consultation</span>
        }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        { !isNew &&
          <span>Edit consultation for patient <strong>{concatenateName(patient)}</strong></span>
        }
        </Typography>
        <div ref={printComponentRef}>
          { !isNew && patient.patientId &&
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'center'}}>
              occurred <Moment fromNow>{moment.utc(occurredAt)}</Moment>
            </Typography>
          }
          { isNew ?
            <div>
              {
                isNewPatient ?
                  <p>New patient created: {concatenateName(patient)} </p> :
                <div>
                  <PatientSearch onChange={(patient) => {setPatient(patient)}}/>
                  <Button size="small" color="primary" onClick={handleNewPatientOpen}>
                    New patient
                  </Button>
                </div>
              }
            </div> :
            <PatientSingle data={patient} showDelete={false}/>
          }
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="symptoms"
              label="Symptoms"
              name="symptoms"
              multiline={true}
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="medications"
              label="Medications"
              name="medications"
              value={medications}
              onChange={e => setMedications(e.target.value)}
              multiline={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="advice"
              label="Advice"
              name="advice"
              value={advice}
              onChange={e => setAdvice(e.target.value)}
              multiline={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="comments"
              label="Comments"
              name="comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
              multiline={true}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                startAdornment={<InputAdornment position="start">£</InputAdornment>}
              />
            </FormControl>
          
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

      </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      { showPrinter &&
        <ReactToPrint
          trigger={() => printButton}
          content={() => printComponentRef.current}
        />
      }
    </Container>
  );
};

export default PatientEdit