import React, { useContext } from "react";
import "./SideBar.css";
//import avatar from "../../images/avatar.png";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function SideBar({ handleEditClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        ></img>
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <p
          className="sidebar__buttons_change-profile"
          onClick={handleEditClick}
        >
          Change Profile data
        </p>
        <p className="sidebar__buttons_signout" onClick={handleSignOut}>
          Log Out
        </p>
      </div>
    </div>
  );
}

export default SideBar;
