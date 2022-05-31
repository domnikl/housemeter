import MeasurementsForm from "./MeasurementsForm";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("MeasurementsForm component", () => {
  test("whether the input field is there", () => {
    render(<MeasurementsForm />);

    const inputEl = screen.getByTestId("inputfieldvalue");

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

    expect(screen.getAllByRole("option", { value: "Electricity" }).length).toBe(
      3
    );
    expect(screen.getAllByRole("option", { value: "Gas" }).length).toBe(3);
    expect(screen.getAllByRole("option", { value: "Water" }).length).toBe(3);
  });

  //   test("inputs will be returned", () => {
  //     let result = null;
  //     render(
  //       <MeasurementsForm
  //         onAdd={(measurement) => {
  //           result = measurement;
  //         }}
  //       />
  //     );
  //     const inputEl = screen.getByTestId("inputfieldmeasurement");
  //     fireEvent.change(inputEl, { target: { value: "123456" } });

  //     const buttonElement = screen.getByRole("button");
  //     userEvent.click(buttonElement);

  //     expect(result).toStrictEqual({
  //       date: "2022-01-26",
  //       measurement: 123456,
  //       type: "Water",
  //     });
  //   });
});
