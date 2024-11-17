import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherCardData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  weatherCardData?.temperature?.[currentTemperatureUnit];

  return (
    <main className="main">
      <WeatherCard weatherCardData={weatherCardData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherCardData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherCardData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
