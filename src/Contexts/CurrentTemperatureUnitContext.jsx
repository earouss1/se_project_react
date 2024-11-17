import React from "react";

//create the context and export to app.jsx
const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;
