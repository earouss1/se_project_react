import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, closeActiveModal, activeModal, isOpen }) => {
  const [name, setName] = useState("");

  const handleChangeName = (event) => {
    console.log(event);
    setName(event.target.value);
  };

  const [url, setUrl] = useState("");

  const handleChangeImageUrl = (event) => {
    console.log(event);
    setUrl(event.target.value);
  };

  const [weather, setWeather] = useState("");

  const handleWeatherTypeChange = (event) => {
    console.log(event);
    setWeather(event.target.value);
  };

  const handleAddItemSubmit = (event) => {
    event.preventDefault();
    onAddItem({ name, url, weather });
  };

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
          onChange={handleChangeName}
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
          maxLength="30"
          value={url}
          onChange={handleChangeImageUrl}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
