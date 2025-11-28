import React, { useContext } from "react";
import "../Header/header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({ handleAddClick, weatherData, isLoggedIn, onLoginClick, onRegisterClick, onLogout }) {
  const { currentTemperatureUnit, handleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <Link to="/" className="header__link">
          <p className="header__date-and-location">
            {currentDate}, {weatherData?.city || "Unknown City"}
            {weatherData?.temp && ` ${weatherData.temp[currentTemperatureUnit]}°${currentTemperatureUnit}`}
          </p>
        </Link>
      </div>
      <div className="header__right">
        <ToggleSwitch 
          isChecked={currentTemperatureUnit === "C"} 
          onToggle={handleSwitchChange} 
        />
        <div className="header__actions">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__button"
              >
                +Add clothes
              </button>
              <Link to="/profile" className="header__link">
                <div className="header__avatar-container">
                  <p className="header__username">{currentUser?.name || "User"}</p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="header__avatar"
                    />
                  ) : (
                    <div className="header__avatar-placeholder">
                      {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                type="button"
                className="header__button"
              >
                Log in
              </button>
              <button
                onClick={onRegisterClick}
                type="button"
                className="header__button"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
