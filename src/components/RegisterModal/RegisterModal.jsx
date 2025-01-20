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
  onSignUpClick,
  onClose,
}) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);
  console.log({ values, handleChange, setValues });

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    onSignUpClick(values);
  };

  return (
    <ModalWithForm
      title={"Sign Up"}
      buttonText={isLoading ? "Register..." : "Sign Up"}
      secondButtonText={isLoading ? "Login..." : "or Login"}
      onSubmit={handleSignUpSubmit}
      isOpen={isOpen}
      onClose={onClose}
      active={activeModal}
    >
      <label className="modal__label" htmlFor="email">
        Email*{" "}
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
        Password*{" "}
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
      <label className="modal__label" htmlFor="name">
        Name*{" "}
        <input
          className="modal__input"
          type="name"
          id="user-name"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Avatar URL*{" "}
        <input
          className="modal__input"
          type="url"
          id="avatar-url"
          name="avatar"
          placeholder="Avatar Url"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
