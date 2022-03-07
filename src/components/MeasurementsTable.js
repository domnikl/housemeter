import classes from "./MeasurementsTable.module.css";
import React, { useState, useEffect } from "react";
import MeasurementsForm from "./MeasurementsForm";
import MeasurementsTableItem from "./MeasurementsTableItem";
import { addReading, getReadings } from "../SupabaseClient";
import { v4 } from "uuid";

const MeasurementsTable = (props) => {
  const [filter, setFilter] = useState("");

  const [measurementsList, setMeasurementsList] = useState([]);

  const filteredReadings = measurementsList.filter(
    (reading) => reading.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  async function measurementsHandleChange(measurement) {
    await addReading(measurement);
    setMeasurementsList([...measurementsList, measurement]);
  }

  useEffect(() => {
    async function fetchData() {
      setMeasurementsList(await getReadings());
    }
    fetchData();
  }, []);

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
                key={Number.toString()}
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
              className={classes.tableContainer}
              key={v4}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MeasurementsTable;
