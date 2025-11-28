import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ onClose, isOpen, onRegister, isLoading }) {
  const { values, handleChange, setValues } = useForm({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      values.name !== "" && 
      values.email !== "" && 
      values.password !== "" && 
      values.avatar !== ""
    );
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    })
      .then(() => {
        setValues({});
        onClose();
      })
      .catch((err) => {
        console.error("Failed to register new user account:", err);
      });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          required
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          required
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          minLength="6"
          onChange={handleChange}
          value={values.password || ""}
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          required
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
        />
      </label>

      <button type="submit" className="modal__submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

