import closeButton from "../../images/closebtn.png";
import React from "react";
import "./RemoveModal.css";

function RemoveModal({ isOpen, onClose, onConfirm }) {
  const confirmDelete = () => {
    console.log("Delete Confirmed");
    onConfirm();
  };

  return (
    <div className={`modal modal__remove ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_remove">
        <button onClick={onClose} className="modal__close-button">
          <img src={closeButton} alt="close" />
        </button>
        <div className="modal__remove-warning">
          <p className="modal__remove-warning-text">
            You are about to delete this item.
          </p>
          <p className="modal__remove-warning-text">
            Are you want to delete this item. This action can't be undone!
          </p>
        </div>
        <div className="modal__remove-buttons">
          <button
            className="modal__remove-button-delete"
            onClose={confirmDelete}
            type="button"
          >
            Yes, Delete
          </button>
          <button
            className="modal__remove-button-cancel"
            onClose={onClose}
            type="button"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveModal;
