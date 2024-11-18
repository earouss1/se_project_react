import "./Header.css";
import { Link } from "react-router-dom";
import avatar from "../../images/avatar.png";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherCardData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-loc">
        {currentDate}, {weatherCardData.city}
      </p>
      <>
        <div className="header__far-right">
          <ToggleSwitch />
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-button"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">Allan Rousseau</p>
              <img
                src={avatar}
                alt="Allan Rousseau"
                className="header__avatar"
              />
            </div>
          </Link>
        </div>
      </>
    </header>
  );
}

export default Header;
