import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({
  onAddItem,
  closeActiveModal,
  activeModal,
  isOpen,
  isLoading,
}) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(defaultValues);

  const handleAddItemSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      onAddItem(values);
    }
    resetForm(defaultValues);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      buttonText={isLoading ? "Saving..." : "Save"} //{"Add garment"}
      title={"New garment"}
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleAddItemSubmit}
      isValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          minLength="3"
          maxLength="30"
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__errors">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          id="imageUrl"
          placeholder="Image Url"
          name="imageUrl"
          minLength="3"
          maxLength="2000"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__errors">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className="modal__label modal__label_type_radio modal__label_type_radio_fix"
        >
          <input
            type="radio"
            name="weather"
            id="hot"
            className="modal__input-radio"
            value="hot"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            id="warm"
            className="modal__input-radio"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className="modal__label modal__label_type_radio modal__label_type_radio_fixx modal__label_type_radio_margin_fix"
        >
          <input
            type="radio"
            name="weather"
            id="cold"
            className="modal__input-radio"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
