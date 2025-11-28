import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ isChecked, onToggle }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        checked={isChecked}
        onChange={onToggle}
      />
      <span className="toggle-switch__slider"></span>
      <span className={`toggle-switch__text toggle-switch__text_F ${isChecked ? "toggle-switch__text_active" : ""}`}>
        F
      </span>
      <span className={`toggle-switch__text toggle-switch__text_C ${!isChecked ? "toggle-switch__text_active" : ""}`}>
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
