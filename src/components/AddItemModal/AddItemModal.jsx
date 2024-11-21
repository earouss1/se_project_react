import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../UseForm/UseForm";

const AddItemModal = ({
  /*onAddItem*/ handleAddItemSubmit,
  closeActiveModal,
  activeModal,
  isOpen,
}) => {
  const { values, handleChange, setValues } = useForm({});

  // const [name, setName] = useState("");

  // const handleChangeName = (event) => {
  //   console.log(event);
  //   setName(event.target.value);
  // };

  // const [imageUrl, setImageUrl] = useState("");

  // const handleChangeImageUrl = (event) => {
  //   console.log(event);
  //   setImageUrl(event.target.value);
  // };

  // const [weather, setWeather] = useState("");

  // const handleWeatherTypeChange = (event) => {
  //   console.log(event);
  //   setWeather(event.target.value);
  // };

  // const handleAddItemSubmit = (event) => {
  //   event.preventDefault();
  //   onAddItem({ name, imageUrl, weather });
  // };

  return (
    <ModalWithForm
      isOpen={isOpen}
      buttonText={"Add garment"}
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
          value={name}
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
          name="url"
          minLength="1"
          maxLength="2000"
          value={imageUrl}
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
            name="radbtn"
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
            name="radbtn"
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
            name="radbtn"
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
