import classes from "./MeasurementsForm.module.css";
import { v4 as uuidv4 } from "uuid";
import useInput from "./useInput";

const MeasurementsForm = (props) => {
  //TODO: Validierungs Regeln Anpassen
  const inputValue = useInput((value) => value !== "", ""); //TODO: valide gleitkommazahl nicht <0 mit .
  const inputType = useInput((type) => type !== "", "Electricity"); //TODO: nur einen vorhanden Type eingegeben werden kann
  const inputDate = useInput(
    (date) => !isNaN(new Date(date).getTime()),
    new Date().toISOString("h12", "hour12").split("T")[0]
  );

  let formValidity =
    inputValue.isValid && inputType.isValid && inputDate.isValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formValidity) {
      return;
    }

    props.onAdd({
      date: inputDate.value,
      type: inputType.value,
      value: inputValue.value,
      id: uuidv4(),
    });

    // reset to initial values and regenerate Id
    inputValue.reset();
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
        value={inputDate.value}
        className={classes.inputDate}
        onChange={inputDate.valueChangeHandler}
        onBlur={inputDate.inputBlurHandler}
      ></input>
      {inputDate.hasError && (
        <p className={classes.invalid}>Please input a valid date.</p>
      )}
      <label htmlFor="lableType" className={classes.lable}>
        Type
      </label>
      <div className={classes.selectcontainer}>
        <select
          data-testid="selectInputType"
          name="measurementsType"
          value={inputType.value}
          className={classes.meterTypeSelect}
          onChange={inputType.valueChangeHandler}
          onBlur={inputType.inputBlurHandler}
        >
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
      {inputType.hasError && (
        <p className={classes.invalid}>Please input a valid type.</p>
      )}
      <label htmlFor="value" className={classes.label}>
        Measurement
      </label>
      <input
        className={classes.valueInput}
        value={inputValue.value}
        data-testid="inputfieldvalue"
        type="text"
        onChange={inputValue.valueChangeHandler}
        onBlur={inputValue.inputBlurHandler}
      ></input>
      {inputValue.hasError && (
        <p className={classes.invalid}>Please input a valid value.</p>
      )}

      <button
        type="submit"
        className={classes.submitButton}
        disabled={!formValidity}
      >
        Submit
      </button>
    </form>
  );
};

export default MeasurementsForm;

//erst state ändern dann erste valueInput componente neu rendern
