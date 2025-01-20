import closeButton from "../../images/closebtn.png";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  secondButtonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close-button">
          <img src={closeButton} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit_button">
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
            <button type="button" className="modal__submit-button">
              {secondButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
