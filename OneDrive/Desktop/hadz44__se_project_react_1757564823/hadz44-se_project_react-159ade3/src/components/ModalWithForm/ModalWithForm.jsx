import React from "react";
import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";
import unionIcon from "../../assets/Union.png";

function ModalWithForm({ name, onClose, isOpen, ...props }) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <div className="modal__container">
        <button
          className="modal__close-in-container"
          type="button"
          onClick={onClose}
        >
          <img src={unionIcon} alt="Close" />
        </button>
        <h2 className='modal__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className="modal__form">
          {props.children}
        </form>
      </div>
    </Modal>
  );
}

export default ModalWithForm;
