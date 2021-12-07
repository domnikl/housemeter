import React from "react";
import classes from "./MeasurementsForm.module.css";

const MeasurementsForm = (props) => {
  return (
    <form className={classes.inputForm}>
      <input
        type="number"
        className={classes.numberInput}
        placeholder="Measurment"
      ></input>
      <select className={classes.inputSelect}>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Gas">Gas</option>
      </select>
      <button className={classes.submitButton}>Submit</button>
    </form>
  );
};

export default MeasurementsForm;
