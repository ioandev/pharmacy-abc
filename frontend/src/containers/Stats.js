import React from "react";

import PatientsByAgeGroupGraph from '../components/Helpers/PatientsByAgeGroupGraph'
import ConsultationsByQuarterGraph from '../components/Helpers/ConsultationsByQuarterGraph'

const Stats = props => {
  return (
    <div
      style={{
      }}
    >
      <h1>Stats</h1>
      <h2>Patients by age group</h2>
      <PatientsByAgeGroupGraph />
      <h2>Consultations by quarter</h2>
      <ConsultationsByQuarterGraph/>

    </div>
  );
};

export default Stats