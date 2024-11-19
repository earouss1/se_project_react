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
            Are you are sure you want to delete this item?
          </p>
          <p className="modal__remove-warning-text">
            This action is irreversible.
          </p>
        </div>
        <div className="modal__remove-buttons">
          <button
            className="modal__remove-button-delete"
            onClick={confirmDelete}
            type="submit"
          >
            Yes, Delete
          </button>
          <button
            className="modal__remove-button-cancel"
            onClick={onClose}
            type="submit"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveModal;
