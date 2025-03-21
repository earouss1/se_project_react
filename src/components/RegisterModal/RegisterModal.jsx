import React from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// function RegisterModal({ isOpen, onClose, userRegister, setActiveModal }) {
//   const [name, setName] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleNameChange = (event) => {
//     console.log(event.target.value);
//     setName(event.target.value);
//   };

//   const handleAvatarChange = (event) => {
//     console.log(event.target.value);
//     setAvatar(event.target.value);
//   };

//   const handleChangePassword = (event) => {
//     console.log(event.target.value);
//     setPassword(event.target.value);
//   };

//   const handleChangeEmail = (event) => {
//     console.log(event.target.value);
//     setEmail(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     userRegister({ email, avatar, password });
//   };

//   const handleChangeModal = (event) => {
//     event.preventDefault();
//     setActiveModal("register");
//   };

const RegisterModal = ({
  isLoading,
  activeModal,
  isOpen,
  handleRegister,
  toggleModal,
  onClose,
}) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(defaultValues);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      handleRegister(values);
    }
    resetForm(defaultValues);
  };

  return (
    <ModalWithForm
      title={"Sign Up"}
      buttonText={isLoading ? "Register..." : "Sign Up"}
      secondButtonText={"or Login"}
      onSubmit={handleSignUpSubmit}
      isOpen={isOpen}
      onClose={onClose}
      active={activeModal}
      isValid={isValid}
      toggleModal={toggleModal}
    >
      <label className="modal__label" htmlFor="user-email">
        Email*{" "}
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
          value={values.email || ""}
          autoComplete="on"
        />
        {errors.email && <span className="modal__errors">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="user-password">
        Password*{" "}
        <input
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          type="password"
          id="user-password"
          name="password"
          placeholder="Password"
          maxLength={30}
          minLength={7}
          required
          onChange={handleChange}
          value={values.password || ""}
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="modal__errors">{errors.password}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="user-name">
        Name*{" "}
        <input
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          type="name"
          id="user-name"
          name="name"
          placeholder="Name"
          required
          maxLength={30}
          minLength={2}
          onChange={handleChange}
          value={values.name || ""}
          autoComplete="name"
        />
        {errors.name && <span className="modal__errors">{errors.name}</span>}
      </label>
      <label className="modal__label" htmlFor="avatar-url">
        Avatar URL*{" "}
        <input
          className={`modal__input ${
            errors.avatar ? "modal__input_type_error" : ""
          }`}
          type="url"
          id="avatar-url"
          name="avatar"
          placeholder="Avatar Url"
          required
          onChange={handleChange}
          value={values.avatar || ""}
          autoComplete="on"
        />
        {errors.avatar && (
          <span className="modal__errors">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
