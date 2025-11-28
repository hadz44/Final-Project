import "./ItemModal.css";
import { Modal } from "../Modal/Modal";
import unionIcon from "../../assets/Union.png";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("Card passed to ItemModal:", card);
  if (!card) {
    return null; // Do not render the modal if card is null or undefined
  }

  // Check if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;

  return (
    <Modal name="preview" isOpen={activeModal === "preview"} onClose={onClose}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-in-container"
          type="button"
          onClick={onClose}
        >
          <img src={unionIcon} alt="Close" />
        </button>
        {console.log(card.imageUrl)}
        <img
          src={card.imageUrl}
          alt={card.name || "Weather wear"}
          className="modal__image"
        />
        <div className="modal__footer_container">
          <div className="modal__footer">
            <div className="modal__footer-top">
              <h2 className="modal__caption">{card.name}</h2>
              {isOwn && (
                <div className="modal__delete-btn">
                  <button className="modal__delete" onClick={() => onDelete(card)}>
                    Delete Item
                  </button>
                </div>
              )}
            </div>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
