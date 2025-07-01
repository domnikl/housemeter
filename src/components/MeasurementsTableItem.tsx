import React from "react";
import classes from "./MeasurementsTableItem.module.css";
import { Measurement, MeasurementType } from "../MeasurementInterface";
import Tag from "./Tag";

function formatValue(reading: Measurement) {
  const formattedValue = new Intl.NumberFormat("de-DE", {
    style: "decimal",
  }).format(reading.value);
  if (reading.type === "Electricity") {
    return formattedValue + " kWh";
  } else if (reading.type === "Water") {
    return formattedValue + " m³";
  } else {
    return formattedValue + " m³";
  }
}

interface MeasurementsTableItemProps {
  onRemove: (id: string) => void;
  item: Measurement;
}

const MeasurementsTableItem = (props: MeasurementsTableItemProps) => {
  const handleDelete = ({ id }: Measurement) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      props.onRemove(id);
    }
  };

  return (
    <tr className={classes.tablerow}>
      <td className={classes.valueTable}>
        {new Intl.DateTimeFormat().format(new Date(props.item.date))}
      </td>
      <td className={classes.valueTable}>
        <Tag type={props.item.type as MeasurementType} />
      </td>
      <td className={classes.valueTable}>
        {" "}
        {formatValue(props.item)}
        <button
          type="button"
          className={classes.deletebutton}
          onClick={() => handleDelete(props.item)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default MeasurementsTableItem;
