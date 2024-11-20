import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import main elements
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import modal
import ItemModal from "../ItemModal/itemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RemoveModal from "../RemoveModal/RemoveModal";
// import API and weatherUpdate
//import APi from "../../utils/APi";
import { getItems, deleteItems, addNewItems } from "../../utils/APi";
import { weatherUpdate } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
// import routes setUp
import Profile from "../Profile/Profile";

function App() {
  const [weatherCardData, setWeatherCardData] = useState({
    type: "Cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  //const [removeModal, setRemoveModal] = useState("false");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState("false");

  const openRemoveModal = (card) => {
    setSelectedCard(card);
    setActiveModal("remove-item");
  };

  const closeRemoveModal = () => {
    setActiveModal("remove-item");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    openRemoveModal(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const onAddItem = (values) => {
    console.log(values);
    handleAddItemSubmit(values);
  };

  const handleAddItemSubmit = (item) => {
    addNewItems(item)
      .then((newItem) => {
        console.log("clothingItems then update", clothingItems);
        setClothingItems([newItem, ...clothingItems]);
        setActiveModal(null);
      })
      .catch((error) => {
        console.error("Clothes failed to be added! What to wear?", error);
      });
  };

  const handleConfirmDelete = () => {
    if (selectedCard) {
      deleteItems(selectedCard._id)
        .then(() => {
          setClothingItems((previousItems) => {
            return previousItems.filter((item) => {
              return item._id !== selectedCard._id;
            });
          });

          setConfirmDelete(false);
          closeRemoveModal();
          closeActiveModal();
        })
        .catch((error) => {
          console.error(
            "OOps Nothing to wear! This clothe has been deleted.",
            error
          );
        });
    }
  };

  // const handleClothingItems = () => {
  //   setClothingItems("");
  // };

  // const api = new APi({
  //   baseUrl: "http://localhost:3001",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  //use effect for weather api
  useEffect(() => {
    weatherUpdate(coordinates, APIkey)
      .then((data) => {
        const filterredData = filterWeatherData(data);
        setWeatherCardData(filterredData);
      })
      .catch(console.error);
  }, []);
  // use effect for items api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Clothes are missing! What to wear?", error);
      });
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherCardData={weatherCardData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            ></Route>
          </Routes>
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            handleAddItemSubmit={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            handleDeleteClick={handleDeleteClick}
          />
        )}

        <RemoveModal
          //activeModal={activeModal}
          onClose={closeActiveModal /*closeRemoveModal*/}
          onConfirm={handleConfirmDelete}
          isOpen={activeModal === "remove-item"}
        />

        {/* <ItemModal
          selectedCard={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
        /> */}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
