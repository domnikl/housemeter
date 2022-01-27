import MeasurementsForm from "./MeasurementsForm";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

//Testen das im Input Feld - Text steht FORM - tobeinthedocument - 1. eigabefeld da ist 2. render Form on Add die aufzeichnet was geadded wude - merken in const - onAddHandler - jest board mittel prüfen
describe("MeasurementsForm component", () => {
  test("whether the input field is there", () => {
    render(<MeasurementsForm />);

    const inputEl = screen.getByTestId("inputfieldmeasurement");

    expect(inputEl).toBeInstanceOf(HTMLInputElement);
    expect(inputEl.value).toBe("");
  });

  test("whether the date field is there", () => {
    render(<MeasurementsForm />);

    const inputElDate = screen.getByTestId("inputDate");

    expect(inputElDate).toBeInstanceOf(HTMLInputElement);
    expect(inputElDate.value).toBe("");
  });

  test("whether the type field is there", () => {
    render(<MeasurementsForm />);
    render(
      <form data-testid="form">
        <lable htmlFor="lableType">Type</lable>
        <select data-testid="selectInputType" name="measurementsType">
          {" "}
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </form>
    );
    const selectEl = screen.getByTestId("selectInputType", { exact: true });

    expect(selectEl).getByText("Electricity");
    expect(selectEl).getByText("Water");
    expect(selectEl).getByText("Gas");

    // const inputElType = screen.getByTestId("inputType");

    // expect(inputElType).toBeInstanceOf(HTMLInputElement);
    // expect(inputElType.value).toBe("");
  });

  test("inputs will be returned", () => {
    let result = null;
    render(
      <MeasurementsForm
        onAdd={(measurement) => {
          result = measurement;
        }}
      />
    );
    const inputEl = screen.getByTestId("inputfieldmeasurement");
    fireEvent.change(inputEl, { target: { value: "123456" } });

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(result).toStrictEqual({
      date: "2022-01-26",
      measurement: 123456,
      type: "Water",
    });
  });
});
