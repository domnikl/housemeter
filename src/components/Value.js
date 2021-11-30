import { useState } from "react";
import classes from "./Value.module.css";
import SelectMenu from "./SelectMenu";
import React from "react";

const Value = (props) => {
  const [filter, setFilter] = useState("");

  const readings = [
    {
      date: new Date("2021-01-10"),
      type: "Electricity",
      value: 100,
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

  function renderSwitch(readings) {
    switch (readings) {
      case "Electricity":
        console.log("kWh");
        break;
      case "Water":
        console.log("m3");
        break;
      case "Gas":
        console.log("m3");
        break;
      default:
        console.log("");
    }
  }

  return (
    <React.Fragment>
      <tbody className={classes.container}>
        {sortReadings.map((reading) => (
          <tr key={reading.id}>
            <td className={classes.td}>
              {new Intl.DateTimeFormat().format(reading.date)}
            </td>
            <td className={classes.td}>
              {reading.type}
              {renderSwitch(readings)}
            </td>
            <td className={classes.td}>
              {new Intl.NumberFormat({ style: "decimal" }).format(
                reading.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  );
};

export default Value;
