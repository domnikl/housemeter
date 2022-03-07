import React from "react";
import classes from "./MeasurementsTableItem.module.css";

function formatValue(reading) {
  const formattedValue = new Intl.NumberFormat({ style: "number" }).format(
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

const MeasurementsTableItem = (props) => {
  return (
    <tr className={classes.tabelrow}>
      <td className={classes.valueTable}>
        {new Intl.DateTimeFormat().format(new Date(props.item.date))}
      </td>
      <td className={classes.valueTable}>{props.item.type}</td>
      <td className={classes.valueTable}> {formatValue(props.item)}</td>
    </tr>
  );
};

export default MeasurementsTableItem;
