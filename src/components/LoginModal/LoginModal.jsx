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

  const { values, handleChange, setValues } = useForm(defaultValues);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onLoginClick(values);
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
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          className="modal__input"
          type="email"
          id="user-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        <input
          className="modal__input"
          type="password"
          id="user-password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
