import React from "react";
import ChartistGraph from "react-chartist";
import chartist from "chartist";
import axios from "axios";

const PatientsByAgeGroupGraph = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const apiUrl = `${process.env.REACT_APP_API}Stats/patientsByAgeGroup`;
      let fetchedData = (await axios.get(apiUrl)).data;
      setData(fetchedData);
    }
    fetchData();
  }, []);

  var graphData = {
    labels: data.map((d) => d.metric),
    series: [
      {
        name: "series-1",
        data: data.map((d) => ({
          x: d.metric,
          y: d.count,
        })),
      },
    ],
  };

  var options = {
    type: chartist.FixedScaleAxis,
    divisor: 1,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        if (value < 1) {
          return "INVALID"
        }
        return `${value}-${value+10}`;
      },
    },
  };

  var type = "Line";

  return (
    <div>
      <ChartistGraph data={graphData} options={options} type={type} />
    </div>
  );
};

export default PatientsByAgeGroupGraph;
