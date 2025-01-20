import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  isSignedOut,
  isLoggedIn,
  handleEditClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar isSignedOut={isSignedOut} handleEditClick={handleEditClick} />
      </section>
      <section className="profile__clotching_items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
