import "./ItemCard.css";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import like from "../../images/likebtn.png";

function ItemCard({ item, onCardClick, isLoggedIn, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser?.user?._id)
  );

  const handleCardPreview = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
    setIsLiked(!isLiked);
  };

  const cardLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card_like";

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn ? (
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          >
            <img
              src={like}
              alt={item.name}
              className={cardLikeButtonClassName}
              onClick={handleLike}
            />
          </button>
        ) : (
          <></>
        )}
      </div>
      <img
        onClick={handleCardPreview}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
