import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
//import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherCardData, handleCardClick, clothingItems, handleLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  weatherCardData?.temperature?.[currentTemperatureUnit];

  return (
    <main className="main">
      <WeatherCard weatherCardData={weatherCardData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherCardData?.temp?.[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherCardData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
