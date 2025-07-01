import classes from "./MeasurementsTable.module.css";
import React, { useState, useEffect } from "react";
import MeasurementsForm from "./Form/MeasurementsForm";
import MeasurementsTableItem from "./MeasurementsTableItem";
import {
  addMeasurements,
  deleteMeasurements,
  getMeasurements,
} from "../SupabaseClient";
import { Measurement, MeasurementType } from "../MeasurementInterface";

const MeasurementsTable = () => {
  const [filter, setFilter] = useState<MeasurementType | "">("");
  const [measurementsList, setMeasurementsList] = useState<Measurement[]>([]);

  const filteredReadings = measurementsList.filter(
    (measurement: Measurement) => measurement.type === filter || filter === ""
  );
  console.log(filteredReadings);

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

  const handleRemove = (measurement: Measurement) => {
    deleteMeasurements(measurement);
    const newList = measurementsList.filter(
      (r: Measurement) => r.id !== measurement.id
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
                onChange={(e) =>
                  setFilter(e.target.value as MeasurementType | "")
                }
                value={filter}
              >
                {" "}
                <option value="">All Types</option>
                <option value="Electricity">⚡ Electricity</option>
                <option value="Water">💧 Water</option>
                <option value="Gas">🔥 Gas</option>
              </select>
            </th>

            <th className={classes.tablemeasurement}>Measurements</th>
          </tr>
        </thead>
        <tbody className={classes.bodyContainer}>
          {sortReadings.map((reading: Measurement) => (
            <MeasurementsTableItem
              item={reading}
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
