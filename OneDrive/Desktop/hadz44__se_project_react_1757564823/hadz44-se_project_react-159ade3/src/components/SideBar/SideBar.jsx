import React, { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img src={currentUser.avatar} alt={currentUser.name} className="sidebar__avatar" />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <h2 className="sidebar__name">{currentUser?.name || "User"}</h2>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
