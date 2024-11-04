import "./ItemModal.css";
import closeButton from "../../images/closebtn.png";

function ItemModal({ activeModal, onClose, selectedCard }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close-button">
          <img src={closeButton} alt="close" />
        </button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__captions">
          <h2 className="modal__card-name">{selectedCard.name}</h2>
          <p className="modal__card-weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
