import classes from "./MeasurementsTable.module.css";
import React, { useState } from "react";
import MeasurementsForm from "./MeasurementsForm";
import MeasurementsTableItem from "./MeasurementsTableItem";

const MeasurementsTable = (props) => {
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

  const [measurementsList, setMeasurementsList] = useState(readings);

  const filteredReadings = measurementsList.filter(
    (reading) => reading.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort((a, b) => b.date - a.date);
  console.log(sortReadings);

  const measurementsHandleChange = (measurement) => {
    setMeasurementsList([...measurementsList, measurement]);
  };

  return (
    <React.Fragment>
      <MeasurementsForm onAdd={measurementsHandleChange} />

      <table className={classes.wrappingContainer}>
        <thead>
          <tr className={classes.header}>
            <th>Date</th>
            <th className={classes.tabletype}>
              Type{" "}
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
            </th>

            <th className={classes.tablemeasurement}>Measurements</th>
          </tr>
        </thead>
        <tbody className={classes.bodyContainer}>
          {sortReadings.map((reading) => (
            <MeasurementsTableItem
              item={reading}
              filter={filteredReadings}
              key={reading.id}
              className={classes.tableContainer}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MeasurementsTable;
