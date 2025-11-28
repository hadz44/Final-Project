import React, { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.name !== "" && values.imageUrl !== "" && values.weatherType !== "");
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weatherType: values.weatherType,
    })
      .then(() => {
        setValues({});
        onClose();
      })
      .catch((err) => {
        console.error("Failed to add clothing item to wardrobe:", err);
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-item-name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="add-item-name"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
      </label>

      <label htmlFor="add-item-imageUrl" className="modal__label modal__label_image-url">
        Image{" "}
        <input
          required
          type="url"
          className="modal__input"
          id="add-item-imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          minLength="1"
          onChange={handleChange}
          value={values.imageUrl || ""}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type: </legend>
        <label htmlFor="add-item-hot" className="modal__label modal__label_type_radio">
          <input
            required
            id="add-item-hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="add-item-warm" className="modal__label modal__label_type_radio">
          <input
            id="add-item-warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="add-item-cold" className="modal__label modal__label_type_radio">
          <input
            id="add-item-cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
      <button type="submit" className="modal__submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Saving...' : 'Add garment'}
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
