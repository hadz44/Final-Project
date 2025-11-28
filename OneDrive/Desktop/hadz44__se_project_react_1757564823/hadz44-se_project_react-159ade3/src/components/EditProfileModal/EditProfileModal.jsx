import React, { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../context/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onEditProfile, isLoading }) {
  const { values, handleChange, setValues } = useForm({});
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  // Pre-fill form with current user data when modal opens
  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, setValues]);

  useEffect(() => {
    setIsFormValid(
      values.name !== "" && 
      values.avatar !== ""
    );
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({
      name: values.name,
      avatar: values.avatar,
    })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update user profile:", err);
      });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="edit-name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
      </label>

      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          required
          type="url"
          className="modal__input"
          id="edit-avatar"
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
        />
      </label>

      <button type="submit" className="modal__submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Saving...' : 'Save changes'}
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
