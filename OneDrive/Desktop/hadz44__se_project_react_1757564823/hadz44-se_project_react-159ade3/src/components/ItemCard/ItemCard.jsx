import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click when clicking like button
    if (!currentUser) return; // Only allow likes for logged-in users
    
    // Check if the item was liked by the current user
    const isLiked = item.likes && item.likes.some(id => id === currentUser._id);
    
    onCardLike({ id: item._id, isLiked });
  };

  // Check if the item was liked by the current user
  const isLiked = item.likes && item.likes.some(id => id === currentUser?._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="card__image"
      />
      <p className="card__name">{item.name}</p>
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
