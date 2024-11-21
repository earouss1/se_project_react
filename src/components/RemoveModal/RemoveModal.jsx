import closeButton from "../../images/closebtn.png";
import React from "react";
import "./RemoveModal.css";

function RemoveModal({ isOpen, onClose, onConfirm, isLoading }) {
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
          <p className="modal__remove-warning-text modal__remove_warning-text_fix">
            This action is irreversible.
          </p>
        </div>
        <div className="modal__remove-buttons">
          <button
            className="modal__remove-button-delete"
            onClick={confirmDelete}
            type="submit"
            buttontext={isLoading ? "Deleting..." : "Delete"}
          >
            Yes, delete item
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
