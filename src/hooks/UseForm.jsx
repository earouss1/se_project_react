import { useState } from "react";
import React, { useCallback } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    // get the name and value of the input because event.target is the input
    const { value, name } = event.target;
    // set the value into the object using the name
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest(".modal__form").checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return { values, handleChange, setValues, errors, isValid, resetForm };
}

export default useForm;
