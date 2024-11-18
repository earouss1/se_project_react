import React from "react";
import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Allan Rousseau" className="sidebar__avatar" />
      <p className="sidebar__username">Allan Rousseau</p>
    </div>
  );
}

export default SideBar;
