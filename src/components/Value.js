import react, { useState } from "react";
import classes from "./Value.module.css";

const Value = (props) => {
  const date = new Date(Date.UTC(2021, 1, 10));
  const date2 = new Date(Date.UTC(2021, 2, 28));

  const readings = [
    {
      date: new Intl.DateTimeFormat().format(date),
      type: "Current",
      value:
        new Intl.NumberFormat("de-DE", {
          style: "decimal",
        }).format(100) + " kWh",
      id: Math.random().toString(),
    },
    {
      date: new Intl.DateTimeFormat().format(date2),
      type: "Water",
      value:
        new Intl.NumberFormat("de-DE", { style: "decimal" }).format(11) + " m3",
      id: Math.random().toString(),
    },
    {
      date: new Intl.DateTimeFormat().format(date),
      type: "Gas",
      value:
        new Intl.NumberFormat("de-DE", {
          style: "decimal",
        }).format(100) + " kWh/m3",
      id: Math.random().toString(),
    },
  ];

  return (
    <tbody className={classes.container}>
      <select value={props.selected} className={classes.selector}>
        {" "}
        <option></option>
        <option value="Strom">Current</option>
        <option value="Wasser">Water</option>
        <option value="Gas">Gas</option>
      </select>

      {readings.map((reading) => (
        <tr className={classes.tr} key={reading.id}>
          <td className={classes.td}>{reading.date}</td>
          <td className={classes.td}>{reading.type}</td>
          <td className={classes.td}>{reading.value}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Value;
