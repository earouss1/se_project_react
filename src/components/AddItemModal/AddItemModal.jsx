import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import UseForm from "../UseForm/UseForm";

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

  const { values, handleChange, setValues } = UseForm({ defaultValues });
  console.log({ values, handleChange, setValues });

  const handleAddItemSubmit = (event) => {
    event.preventDefault();
    setValues(values);
    onAddItem(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      buttonText={isLoading ? "Saving..." : "Save"} //{"Add garment"}
      title={"New garment"}
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleAddItemSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          minLength="1"
          maxLength="30"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={/*handleChangeName*/ handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          name="imageUrl"
          minLength="1"
          maxLength="2000"
          value={values.imageUrl}
          onChange={/*handleChangeImageUrl*/ handleChange}
        />
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
            onChange={/*handleWeatherTypeChange*/ handleChange}
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
            onChange={/*handleWeatherTypeChange*/ handleChange}
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
            onChange={/*handleWeatherTypeChange*/ handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
