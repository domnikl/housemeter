import { useState } from "react";
import classes from "./MeasurementsForm.module.css";

const MeasurementsForm = (props) => {
  const [measurementsInput, setMeasurementsInput] = useState({
    date: null,
    type: null,
    measurement: null,
  });

  const handleDateChange = (event) => {
    setMeasurementsInput({
      ...measurementsInput,
      date: event.target.value,
      id: Math.random().toString(),
    });
  };

  const handleMeasurementChange = (event) => {
    setMeasurementsInput({
      ...measurementsInput,
      measurement: parseFloat(event.target.value),
      id: Math.random().toString(),
    });
  };

  const handleTypeChange = (event) => {
    setMeasurementsInput({
      ...measurementsInput,
      type: event.target.value,
      id: Math.random().toString(),
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAdd(measurementsInput);
  };

  return (
    <form className={classes.inputForm} onSubmit={submitHandler}>
      <label htmlFor="Date">
        Date
        <input
          type="date"
          name="date"
          className={classes.inputDate}
          onChange={handleDateChange}
        ></input>{" "}
      </label>
      <br />
      <label htmlFor="Measurements">
        Measurements
        <input
          name="measurementsInput"
          type="number"
          step="any"
          onChange={handleMeasurementChange}
          className={classes.measurementsInput}
        ></input>
      </label>
      <br />
      <label htmlFor="Type">
        Type{" "}
        <select
          name="measurmentsType"
          className={classes.meterTypeSelect}
          onChange={handleTypeChange}
        >
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </label>
      <button type="submit" className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default MeasurementsForm;
