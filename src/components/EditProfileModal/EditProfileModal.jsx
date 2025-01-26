import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onClose,
  isLoading,
  onEditProfileClick,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEditProfileSubmit = (event) => {
    event.preventDefault();
    onEditProfileClick({ name, avatar });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
