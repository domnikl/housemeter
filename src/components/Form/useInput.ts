import { useState } from "react";

const useInput = (
  validateValue: (value: string) => boolean,
  initialState: string
) => {
  const [enteredValue, setEnteredValue] = useState<string>(initialState);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEnteredValue((event.target as HTMLInputElement).value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
