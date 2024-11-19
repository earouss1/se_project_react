import React from "react";
import "./ClothesSection.css";
//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
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
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // to pass as prop
                onCardClick={onCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
