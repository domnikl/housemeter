import classes from "./MeasurementsTable.module.css";
import React, { useState } from "react";
import MeasurementsForm from "./MeasurementsForm";

const Measurements = (props) => {
  const [filter, setFilter] = useState("");

  const readings = [
    {
      date: "2021-01-10",
      type: "Electricity",
      measurement: 1000,
      id: Math.random().toString(),
    },
    {
      date: "2021-05-10",
      type: "Gas",
      measurement: 100,
      id: Math.random().toString(),
    },
    {
      date: "2021-02-28",
      type: "Water",
      measurement: 11,
      id: Math.random().toString(),
    },
  ];

  const [measurementsList, setMeasurmentsList] = useState(readings);

  const filteredReadings = measurementsList.filter(
    (reading) => reading.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort((b, a) => b.date - a.date);

  function formatValue(reading) {
    const formattedValue = new Intl.NumberFormat({ style: "number" }).format(
      reading.measurement
    );
    if (reading.type === "Electricity") {
      return formattedValue + " kWh";
    } else if (reading.type === "Water") {
      return formattedValue + " m³";
    } else {
      return formattedValue + " m³";
    }
  }

  const measurementsHandleChange = (measurement) => {
    setMeasurmentsList([...measurementsList, measurement]);
  };

  return (
    <React.Fragment>
      <MeasurementsForm onAdd={measurementsHandleChange} />
      <select
        className={classes.meterTypeSelect}
        onChange={(e) => setFilter(e.target.value)}
      >
        {" "}
        <option></option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Gas">Gas</option>
      </select>
      <table className={classes.wrappingContainer}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Measurments</th>
          </tr>
        </thead>
        <tbody className={classes.bodyContainer}>
          {sortReadings.map((reading) => (
            <tr key={reading.id} className={classes.tableContainer}>
              <td className={classes.valueTable} key={readings.id}>
                {new Intl.DateTimeFormat().format(new Date(reading.date))}
              </td>
              <td className={classes.valueTable} key={readings.id}>
                {reading.type}
              </td>
              <td className={classes.valueTable} key={readings.id}>
                {" "}
                {formatValue(reading)}
              </td>
              <td item={measurementsList}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Measurements;
