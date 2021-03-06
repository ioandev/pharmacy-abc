import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Link } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { concatenateName } from '../Helpers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 20,
    display: 'inline-block'
  },
  media: {
    height: 140,
  },
});

export default function SinglePatient(props) {
  const classes = useStyles();


  let onDelete = props.onDelete || (() => {})
  let showDelete = props.showDelete !== undefined ? props.showDelete === true : true
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  var { data } = props
  let name = concatenateName(data)

  const handleCloseAgreed = async () => {
    handleClose()

    await axios.delete(`${process.env.REACT_APP_API}Patient/${data.patientId}`)
    onDelete()
    alert(`Deleted Patient ${name}`)
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} (<strong>{moment().diff(data.dateOfBirth, 'years')}</strong>)
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/patients/${data.patientId}`}>
          <Button size="small" color="primary">
            Edit
          </Button>
        </Link>
        {showDelete &&
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Delete
          </Button>
        }
      </CardActions>

      {/* delete dialog box */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this patient?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deleting this patient will be a permanent action. <strong>All consultations associated with <i>{name}</i> will also be deleted.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAgreed} color="secondary">
            Delete anyway
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}