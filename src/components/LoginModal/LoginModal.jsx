import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import useForm from "../../hooks/useForm";

const LoginModal = ({
  isLoading,
  activeModal,
  isOpen,
  handleLogin,
  toggleModal,
  onClose,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(defaultValues);

  // console.log("values =>", values);
  // console.log("errors =>", errors);
  // console.log("isValid =>", isValid);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      // onLoginClick(values)
      handleLogin(values);
    }
    resetForm(defaultValues);
  };

  return (
    <ModalWithForm
      title={"Log In"}
      buttonText={isLoading ? "Login..." : "Login"}
      secondButtonText={"or Sign Up"}
      onSubmit={handleLoginSubmit}
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      toggleModal={toggleModal}
    >
      <label className="modal__label" htmlFor="useremail">
        Email{" "}
        <input
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          type="email"
          id="useremail"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email || ""}
          autoComplete="on"
        />
        {errors.email && <span className="modal__errors">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="userpassword">
        Password{" "}
        {/* {errors.password && (
          <span className="modal__errors">{"errors.password"}</span>
        )} */}
        <input
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          type="password"
          id="userpassword"
          name="password"
          placeholder="Password"
          minLength={7}
          maxLength={30}
          required
          onChange={handleChange}
          value={values.password || ""}
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="modal__errors">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
