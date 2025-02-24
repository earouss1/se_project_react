import "./ItemModal.css";
import closeButton from "../../images/closebtn.png";
import React from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, selectedCard, handleDeleteClick }) {
  const deleteItem = () => {
    handleDeleteClick(selectedCard);
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;

  // const itemDeleteButtonClassName = `modal__delete-button ${
  //   isOwn ? "" : "modal__delete-button_hidden"
  // }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className=/*modal__content*/ "modal__content_type_image">
        <button onClick={onClose} className="modal__close-button" type="button">
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

        {isOwn && (
          <button
            className="modal__delete-button"
            type="submit"
            onClick={deleteItem}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
