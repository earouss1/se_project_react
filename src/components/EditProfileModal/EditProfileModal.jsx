import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const EditProfileModal = ({ isOpen, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);
  console.log({ values, handleChange, setValues });

  const handleEditProfileSubmit = (event) => {
    event.preventDefault();
    onEditProfileClick(values);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && currentUser.name) {
      setValues(currentUser.name);
    } else {
      setValues("");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.avatar) {
      setValues(currentUser.avatar);
    } else {
      setValues("");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title={"Change profile data"}
      buttonText={isLoading ? "Changing..." : "Save Changes"}
      onSubmit={handleEditProfileSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="edit name">
        Name*{" "}
        <input
          className="modal__input"
          type="text"
          id="username"
          name="editName"
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label className="modal__label" htmlFor="edit avatar">
        Avatar*{" "}
        <input
          className="modal__input"
          type="url"
          id="eidtAvatarUrl"
          placeholder="Avatar Url"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
