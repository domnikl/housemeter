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
    <form
      className={classes.inputForm}
      onSubmit={submitHandler}
      data-testid="form"
    >
      <label htmlFor="Date" className={classes.lable}>
        Date
      </label>
      <input
        data-testid="inputDate"
        type="date"
        name="date"
        className={classes.inputDate}
        onChange={handleDateChange}
      ></input>{" "}
      <br />
      <label htmlFor="Measurements" className={classes.lable}>
        Measurements
      </label>
      <input
        data-testid="inputfieldmeasurement"
        name="measurementsInput"
        type="number"
        step="any"
        onChange={handleMeasurementChange}
        className={classes.measurementsInput}
      ></input>
      <br />
      <label htmlFor="lableType" className={classes.lable}>
        Type{" "}
      </label>
      <div className={classes.selectcontainer}>
        {" "}
        <select
          data-testid="selectInputType"
          name="measurementsType"
          className={classes.meterTypeSelect}
          onChange={handleTypeChange}
        >
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
      <button type="submit" className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default MeasurementsForm;
