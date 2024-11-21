import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    // get the name and value of the input because event.target is the input
    const { value, name, imageUrl, weather } = event.target;
    // set the value into the object using the name
    setValues({
      ...values,
      [name]: value,
      [imageUrl]: value,
      [weather]: value,
    });
  };
  return { values, handleChange, setValues };
}

export default useForm;
