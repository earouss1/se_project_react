import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/itemModal";
import { weatherUpdate } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherCardData, setWeatherCardData] = useState({
    type: "Cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const onAddItem = (event) => {
    event.preventDefault();
    console.log(event);
  };

  useEffect(() => {
    weatherUpdate(coordinates, APIkey)
      .then((data) => {
        const filterredData = filterWeatherData(data);
        setWeatherCardData(filterredData);
      })
      .catch(console.error);
  }, []);
  //console.log currentTemperatureUnit to have it in the app also
  console.log(currentTemperatureUnit);
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__wrapper">
          <Header
            handleAddClick={handleAddClick}
            weatherCardData={weatherCardData}
          />
          <Main
            weatherCardData={weatherCardData}
            handleCardClick={handleCardClick}
          />
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={closeActiveModal} />
        )}
        /*
        {/* <ItemModal
          selectedCard={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
        /> */}
        */
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
