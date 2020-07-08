import React from 'react';
import EditSingle from '../components/Patient/edit'

const PatiendEdit = props => {
  return (
    <EditSingle patientId={parseInt(props.match.params.id)} showPrinter={true}/>
  );
};

export default PatiendEdit