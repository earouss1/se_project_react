import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/itemModal";
import { weatherUpdate } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherCardData, setWeatherCardData] = useState({
    type: "Cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  useEffect(() => {
    weatherUpdate(coordinates, APIkey)
      .then((data) => {
        const filterredData = filterWeatherData(data);
        setWeatherCardData(filterredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
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
      <ModalWithForm
        buttonText={"Add garment"}
        title={"New garment"}
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image Url"
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot"
            className="modal__label modal__label_type_radio modal__label_type_radio_fix"
          >
            <input type="radio" id="hot" className="modal__input-radio" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" id="warm" className="modal__input-radio" />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio modal__label_type_radio_fixx modal__label_type_radio_margin_fix"
          >
            <input type="radio" id="cold" className="modal__input-radio" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        selectedCard={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
