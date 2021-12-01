import { useState } from "react";
import classes from "./Value.module.css";
// import SelectMenu from "./SelectMenu";
import React from "react";

const Value = (props) => {
  const [filter, setFilter] = useState("");

  const readings = [
    {
      date: new Date("2021-01-10"),
      type: "Electricity",
      value: 1000,
      id: Math.random().toString(),
    },
    {
      date: new Date("2021-02-28"),
      type: "Water",
      value: 11,
      id: Math.random().toString(),
    },
    {
      date: new Date("2021-05-10"),
      type: "Gas",
      value: 100,
      id: Math.random().toString(),
    },
  ];

  const filteredReadings = readings.filter(
    (reading) => reading.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort((a, b) => b.date - a.date);

  function formatValue(reading) {
    const formattedValue = new Intl.NumberFormat({ style: "decimal" }).format(
      reading.value
    );
    if (reading.type === "Electricity") {
      return formattedValue + " kWh";
    } else if (reading.type === "Water") {
      return formattedValue + " m³";
    } else {
      return formattedValue + " m³";
    }
  }

  return (
    <React.Fragment>
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
        <tbody className={classes.bodyContainer}>
          {sortReadings.map((reading) => (
            <tr key={reading.id} className={classes.tableContainer}>
              <td className={classes.valueTable}>
                {new Intl.DateTimeFormat().format(reading.date)}
              </td>
              <td className={classes.valueTable}>{reading.type}</td>
              <td className={classes.valueTable}> {formatValue(reading)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Value;
