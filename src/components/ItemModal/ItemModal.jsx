import "./ItemModal.css";
import closeButton from "../../images/closebtn.png";
import React from "react";

function ItemModal({ isOpen, onClose, selectedCard, handleDeleteClick }) {
  const DeleteItem = () => {
    console.log("Clicked the delete button", selectedCard);
    handleDeleteClick(selectedCard);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className=/*modal__content*/ "modal__content_type_image">
        <button onClick={onClose} className="modal__close-button">
          <img src={closeButton} alt="close" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__captions">
          <h2 className="modal__card-name">{selectedCard.name}</h2>
          <p className="modal__card-weather">Weather: {selectedCard.weather}</p>
        </div>
        <button
          className="modal__delete-button"
          type="submit"
          onClick={DeleteItem}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
