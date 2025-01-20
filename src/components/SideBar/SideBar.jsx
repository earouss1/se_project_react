import React from "react";
import "./SideBar.css";
import avatar from "../../images/avatar.png";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext).user;
  return (
    <div className="sidebar">
      <img
        src={avatar}
        alt={"currentUser.avatar"}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
