import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ onClose, isOpen, onLogin, isLoading }) {
  const { values, handleChange, setValues } = useForm({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.email !== "" && values.password !== "");
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    })
      .then(() => {
        setValues({});
        onClose();
      })
      .catch((err) => {
        console.error("Failed to authenticate user login:", err);
      });
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          required
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          required
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
        />
      </label>

      <button type="submit" className="modal__submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

