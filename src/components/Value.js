import { useState } from "react";
import classes from "./Value.module.css";

const Value = (props) => {
  const [filter, setFilter] = useState("");

  const readings = [
    {
      date: new Date("2021-01-10"),
      type: "Electricity",
      value:
        new Intl.NumberFormat({
          style: "decimal",
        }).format(100) + " kWh",
      id: Math.random().toString(),
    },
    {
      date: new Date("2021-02-28"),
      type: "Water",
      value: new Intl.NumberFormat({ style: "decimal" }).format(11) + " m3",
      id: Math.random().toString(),
    },
    {
      date: new Date("2021-05-10"),
      type: "Gas",
      value:
        new Intl.NumberFormat({
          style: "decimal",
        }).format(100) + " m3",
      id: Math.random().toString(),
    },
  ];

  const filteredReadings = readings.filter(
    (reading) => reading.type === filter || filter === ""
  );

  const sortReadings = filteredReadings.sort((a, b) => b.date - a.date);

  // const sortReadings = filteredReadings.sort((a, b) => {
  //   if (a.date === b.date) return 0;
  //   else if (a.date < b.date) return 1;
  //   else return -1;
  // });

  return (
    <tbody className={classes.container}>
      <select
        className={classes.selector}
        onChange={(e) => setFilter(e.target.value)}
      >
        {" "}
        <option></option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Gas">Gas</option>
      </select>
      {sortReadings.map((reading) => (
        <tr key={reading.id}>
          <td className={classes.td}>
            {new Intl.DateTimeFormat().format(reading.date)}
          </td>
          <td className={classes.td}>{reading.type}</td>
          <td className={classes.td}>{reading.value}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Value;
