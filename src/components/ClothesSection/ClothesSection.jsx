import React from "react";
import "./ClothesSection.css";
//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContex from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContex);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?.user?._id
  );
  console.log("User items: ", userItems);

  return (
    <div className="clothessection">
      <div className="clothessection__nav">
        <p className="clothessection__text">Your Items</p>
        <button onClick={handleAddClick} className="clothessection__btn">
          + Add New
        </button>
      </div>
      <div className="clothessection__clothes">
        <ul className="clothessection__clothes_list">
          {userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                isLoggedIn={isLoggedIn}
                // to pass as prop
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
