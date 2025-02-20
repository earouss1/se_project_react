import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import useForm from "../../hooks/useForm";

const LoginModal = ({
  isLoading,
  activeModal,
  isOpen,
  onLoginClick,
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
      onLoginClick(values);
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
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          type="email"
          id="user-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <span className="modal__errors">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        {/* {errors.password && (
          <span className="modal__errors">{"errors.password"}</span>
        )} */}
        <input
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          type="password"
          id="user-password"
          name="password"
          placeholder="Password"
          minLength={7}
          maxLength={30}
          required
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && (
          <span className="modal__errors">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
