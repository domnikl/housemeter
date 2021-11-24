import { useState } from "react";
import classes from "./Value.module.css";

const Value = (props) => {
const [filter, setFilter] = useState("")

  const date = new Date(Date.UTC(2021, 1, 10));
  const date2 = new Date(Date.UTC(2021, 2, 28));
  const date3 = new Date(Date.UTC(2021, 5, 10 ))

  const readings = [
    {
      date: new Intl.DateTimeFormat().format(date),
      type: "Electricity",
      value:
        new Intl.NumberFormat({
          style: "decimal",
        }).format(100) + " kWh",
      id: Math.random().toString(),
    },
    {
      date: new Intl.DateTimeFormat().format(date2),
      type: "Water",
      value:
        new Intl.NumberFormat({ style: "decimal" }).format(11) + " m3",
      id: Math.random().toString(),
    },
    {
      date: new Intl.DateTimeFormat().format(date3),
      type: "Gas",
      value:
        new Intl.NumberFormat( {
          style: "decimal",
        }).format(100) + " m3",
      id: Math.random().toString(),
    },
  ];

  const filteredReadings = readings.filter((reading) => 
        reading.type === filter || filter === "" 
  )
const sortReadings = filteredReadings.sort((date, date2, date3) => date - date2 - date3)

  return (
    <tbody className={classes.container}>
      <select className={classes.selector} onChange={(e)=>setFilter(e.target.value)}>
        {" "}
        <option></option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Gas">Gas</option>
      </select>
      {sortReadings.map((reading) => (
        <tr key={reading.id}>
          <td className={classes.td}>{reading.date}</td>
          <td className={classes.td}>{reading.type}</td>
          <td className={classes.td}>{reading.value}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Value;
