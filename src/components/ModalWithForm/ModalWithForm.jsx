import closeButton from "../../images/closebtn.png";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  secondButtonText,
  toggleModal,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
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
          <div className="modal__submit-buttons">
            <button
              type="submit"
              className={`modal__submit-buttons_first ${
                !isValid ? "modal__submit-buttons_first_disabled" : ""
              }`}
            >
              {buttonText}
            </button>
            {secondButtonText && (
              <button
                type="button"
                onClick={toggleModal}
                className="modal__submit-buttons_second"
              >
                {secondButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
