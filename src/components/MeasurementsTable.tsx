import classes from "./MeasurementsTable.module.css";
import React, { useState, useEffect } from "react";
import MeasurementsForm from "./Form/MeasurementsForm";
import MeasurementsTableItem from "./MeasurementsTableItem";
import {
  addMeasurements,
  deleteMeasurements,
  getMeasurements,
} from "../SupabaseClient";

interface Measurement {
  date: number | string;
  value: number;
  type: string;
  id: string;
}

const MeasurementsTable = () => {
  const [filter, setFilter] = useState<string | object>("");
  const [measurementsList, setMeasurementsList] = useState<Measurement[]>([]);

  const filteredReadings = measurementsList.filter(
    (measurement: Measurement) => measurement.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort(
    (a: Measurement, b: Measurement) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  async function measurementsHandleChange(measurement: Measurement) {
    await addMeasurements(measurement);
    setMeasurementsList([...measurementsList, measurement]);
  }

  useEffect(() => {
    async function fetchData() {
      setMeasurementsList(await getMeasurements());
    }
    fetchData();
  }, []);

  const handleRemove = (reading: Measurement) => {
    deleteMeasurements(reading);
    const newList = measurementsList.filter(
      (r: Measurement) => r.id !== reading.id
    );
    setMeasurementsList(newList);
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
          {sortReadings.map((reading: Measurement) => (
            <MeasurementsTableItem
              item={reading}
              filter={filteredReadings}
              className={classes.tableContainer}
              key={reading.id}
              onRemove={() => handleRemove(reading)}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MeasurementsTable;
