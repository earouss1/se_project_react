import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const EditProfileModal = ({ isOpen, onClose, isLoading, handleEdit }) => {
  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, setValues, errors, isValid } =
    useForm(defaultValues);

  const handleEditProfileSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      handleEdit(values);
    }
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });

      // setValues({ name: currentUser.name || ""});
      //   setValues({ imageUrl: currentUser.avatar || "" });
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title={"Change profile data"}
      buttonText={isLoading ? "Changing..." : "Save Changes"}
      onSubmit={handleEditProfileSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="edit-name">
        Name*{" "}
        <input
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          type="text"
          id="edit-name"
          name="name"
          placeholder="Name"
          minLength={2}
          maxLength={30}
          required
          onChange={handleChange}
          value={values.name || ""}
        />
        {errors.name && <span className="modal__errors">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="edit-avatar">
        Avatar*{" "}
        <input
          className={`modal__input ${
            errors.avatar ? "modal__input_type_error" : ""
          }`}
          type="url"
          id="edit-avatar"
          name="avatar"
          placeholder="Avatar Url"
          required
          onChange={handleChange}
          // value={values.avatar}
          value={values.avatar || ""}
        />
        {errors.avatar && (
          <span className="modal__errors">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
