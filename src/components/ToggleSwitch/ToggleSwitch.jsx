import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  // there we use the context created.
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="switch" className="header__switch">
      <input
        type="checkbox"
        className="header__switch_input"
        onChange={handleToggleSwitchChange}
        id="switch"
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "header__switch_slider header__switch_slider-C"
            : "header__switch_slider header__switch_slider-F"
        }
      ></span>
      <p
        className={`header__temp-F ${
          currentTemperatureUnit === "F" && "header__switch_active"
        }`}
      >
        F
      </p>
      <p
        className={`header__temp-C ${
          currentTemperatureUnit === "C" && "header__switch_active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
