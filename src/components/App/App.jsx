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
  const [isLoading, setIsLoading] = useState(false);

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
    handleAddItem(values);
  };

  function handleSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(closeActiveModal)
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
      .catch((error) => {
        console.error("Clothes failed to be added! What to wear?", error);
      })
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }

  const handleAddItem = (item) => {
    // here we create a function that returns a promise
    const makeRequest = () => {
      // `return` lets us use a promise chain `then, catch, finally`
      return addNewItems(item).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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

  // use effect for close modal (escape)

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlay = (event) => {
      if (event.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

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
            handleAddItem={handleAddItem}
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
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
          isOpen={activeModal === "remove-item"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
