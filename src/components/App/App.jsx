import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import "./App.css";
// import main elements
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import modal
import ItemModal from "../ItemModal/itemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RemoveModal from "../RemoveModal/RemoveModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
// import API and weatherUpdate
//import APi from "../../utils/APi";
import {
  getItems,
  deleteItems,
  addNewItems,
  likeItems,
  dislikeItems,
} from "../../utils/APi";
import { weatherUpdate } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
// import routes setUp
import Profile from "../Profile/Profile";
import {
  editUserInfo,
  getUserInfo,
  handleToken,
  signIn,
  signUp,
} from "../../utils/auth";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const onAddItem = (values) => {
    handleAddItem(values);
  };

  const onLoginClick = (values) => {
    handleLogin(values);
  };

  const onSignUpClick = (values) => {
    handleRegister(values);
  };

  const onEditProfileClick = (values) => {
    handleEdit(values);
  };

  const navigate = useNavigate();

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

  function handleCardLike({ id, isLiked }) {
    console.log("App.jsx id", id);
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? likeItems(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : dislikeItems(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  }

  const handleAddItem = (item) => {
    const token = localStorage.getItem("jwt");
    // here we create a function that returns a promise
    const makeRequest = () => {
      // `return` lets us use a promise chain `then, catch, finally`
      return addNewItems(item, token).then((item) => {
        console.log(item, clothingItems);
        setClothingItems([item, ...clothingItems]);
      });
    };
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
    if (selectedCard) {
      deleteItems(selectedCard._id, localStorage.getItem("jwt"))
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

  function handleLogin(data) {
    setIsLoading(true);
    signIn(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleToken(res.token).then((data) => {
            setCurrentUser(data);
          });

          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Login failed, try again", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(data) {
    setIsLoading(true);
    signUp(data)
      .then(() => {
        handleLogin({ email: data.email, password: data.password });
      })
      .catch((error) => {
        console.error("Registration process failed, try again", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEdit(data) {
    setIsLoading(true);
    editUserInfo(data, localStorage.getItem("jwt"))
      .then((data) => {
        //set your user text to the data.name
        setCurrentUser(data);
        setActiveModal(true);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Registration process failed, try again", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //use effect for resgistration
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Who are you?", error);
      });
  }, []);

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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__wrapper">
            <Header
              handleAddClick={handleAddClick}
              weatherCardData={weatherCardData}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              handleSignOut={handleSignOut}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherCardData={weatherCardData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes isLoggedIn={isLoggedIn}>
                    <Profile
                      handleEditClick={handleEditClick}
                      onConfirm={handleConfirmDelete}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                      handleCardLike={handleCardLike}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoutes>
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              isLoading={isLoading}
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

          <LoginModal
            isOpen={activeModal === "login"}
            onLoginClick={onLoginClick}
            onClose={closeActiveModal}
            isLoading={isLoading}
            handleLogin={handleLogin}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            handleRegister={handleRegister}
            setActiveModal={setActiveModal}
            onClose={closeActiveModal}
            isLoading={isLoading}
            onSignUpClick={onSignUpClick}
          />

          <EditProfileModal
            isOpen={activeModal === "edit"}
            setActiveModal={setActiveModal}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
            onEditProfileClick={onEditProfileClick}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
