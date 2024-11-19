import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants";
import { defaultWeatherConditions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherCardData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  weatherCardData?.temperature?.[currentTemperatureUnit];

  const filterredConditions = weatherConditions.filter((state) => {
    return (
      state.day === weatherCardData.isDay &&
      state.condition === weatherCardData.condition
    );
  });

  let weatherCondition;
  if (filterredConditions.length === 0) {
    weatherCondition =
      defaultWeatherConditions[weatherCardData.isDay ? "day" : "night"];
  } else {
    weatherCondition = filterredConditions[0];
  }

  return (
    <section className="weather-cards">
      <p className="weather-cards__temp">
        {weatherCardData?.temp?.[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherCondition?.url}
        alt={`Card is showing ${weatherCondition?.day ? "day" : "night"}time ${
          weatherCondition?.condition
        }weather`}
        className="weather-cards__image"
      />
    </section>
  );
}

export default WeatherCard;
