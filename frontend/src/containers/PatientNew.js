import React from 'react';
import EditSingle from '../components/Patient/edit'

const PatientNew = props => {
  return (
    <EditSingle showPrinter={true} isNew={true}/>
  );
};

export default PatientNew