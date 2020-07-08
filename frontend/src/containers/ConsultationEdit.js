import React from 'react';
import EditSingle from '../components/Consultation/edit'

const ConsultationEdit = props => {
  return (
    <EditSingle consultationId={parseInt(props.match.params.id)} showPrinter={true}/>
  );
};

export default ConsultationEdit