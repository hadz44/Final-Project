import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({ handleAddClick, onCardClick, clothingItems, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  
  // Filter items to show only those owned by the current user
  const userItems = clothingItems.filter(item => item.owner === currentUser?._id);
  
  return (
    <div className="clothes-section">
      <div className="clothes-section__description">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
