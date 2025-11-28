import "./DeleteItemModal.css";
import { Modal } from "../Modal/Modal";
import unionIcon from "../../assets/Union.png";

function DeleteItemModal({
  activeModal,
  card,
  onConfirm,
  onClose,
  onSubmit,
  onDelete,
  isLoading,
}) {
  const handleOnConfirmDelete = (e) => {
    console.log("Delete itemModal:", card);
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal name="delete" isOpen={activeModal === "delete"} onClose={onClose}>
      <div className="delete-modal__content">
        <button
          className="modal__close-in-container"
          type="button"
          onClick={onClose}
        >
          <img src={unionIcon} alt="Close" />
        </button>
        <h2 className="delete-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
          <br />
        </h2>
        <form className="modal__form">
          <button
            className="delete-modal__submit"
            type="submit"
            onClick={handleOnConfirmDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Yes, delete item'}
          </button>
          <button className="cancel__submit" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default DeleteItemModal;
