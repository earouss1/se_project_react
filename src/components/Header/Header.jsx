import "./Header.css";
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
      <img src={logo} alt="logo" className="header__logo" />
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
          <div className="header__user-container">
            <p className="header__username">Allan Rousseau</p>
            <img src={avatar} alt="Allan Rousseau" className="header__avatar" />
          </div>
        </div>
      </>
    </header>
  );
}

export default Header;
