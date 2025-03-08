import "./Header.css";
import { Link } from "react-router-dom";
import avatar from "../../images/avatar.png";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherCardData,
  handleLoginClick,
  handleSignUpClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-loc">
        {currentDate}, {weatherCardData.city}
      </p>

      {isLoggedIn ? (
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
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__placeholder-avatar">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="header__far-right">
          <ToggleSwitch />
          <button
            className="header__button  header__button_signup"
            onClick={handleSignUpClick}
            type="button"
          >
            Sign Up
          </button>
          <button
            className="header__button header__button_login"
            onClick={handleLoginClick}
            type="button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
