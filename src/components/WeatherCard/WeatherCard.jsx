import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants";
import { defaultWeatherConditions } from "../../utils/constants";

function WeatherCard({ weatherCardData }) {
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
      <p className="weather-cards__temp">{weatherCardData.temp.F} &deg; F</p>
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
