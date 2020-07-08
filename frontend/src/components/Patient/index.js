import React from 'react';
import SinglePatient from './single'
import axios from 'axios'

export default function PatientIndex() {
  const [patients, setPatients] = React.useState([]);
  const [updateNo, setUpdateNo] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const patients = (await axios(`${process.env.REACT_APP_API}Patient`)).data
      setPatients(patients);
    })()
  }, [updateNo])
  
  return (
    <div>
      {patients.map((patient) => {     
        return (<SinglePatient key={patient.patientId} data={patient} onDelete={() => setUpdateNo(updateNo+1)}/>) 
      })}
    </div>
  );
}