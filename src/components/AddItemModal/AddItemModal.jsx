import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, closeActiveModal, activeModal, isOpen }) => {
  return (
    <ModalWithForm
      isOpen={isOpen}
      buttonText={"Add garment"}
      title={"New garment"}
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
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
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radbtn"
            id="warm"
            className="modal__input-radio"
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
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
