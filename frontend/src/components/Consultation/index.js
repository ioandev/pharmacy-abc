import React from 'react';
import SingleConsultation from './single'
import axios from 'axios'

export default function PatientIndex() {
  const [consultations, setConsultations] = React.useState([]);
  const [updateNo, setUpdateNo] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      console.log("Getting consultations.")
      const consultations = (await axios(`${process.env.REACT_APP_API}Consultation`)).data
      setConsultations(consultations);
    })()
  }, [updateNo])
  return (
    <div>
      {consultations.map((consultation) => {     
        return (<SingleConsultation key={consultation.consultationId} data={consultation} onDelete={() => setUpdateNo(updateNo+1)} />) 
      })}
    </div>
  );
}