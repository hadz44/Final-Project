import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, addItem, addCardLike, removeCardLike } from "../../utils/api";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { register, login, checkToken, updateProfile } from "../../utils/auth";

const APIkey = "a55a98aaee04d0285bcba725026a08a1";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const cardToDelete = useRef(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userLocation, setUserLocation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    return addItem({ name, weather: weatherType, imageUrl }, token)
      .then((newItem) => {
        // Use the complete item returned from the backend
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add clothing item to wardrobe:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = (card) => {
    setActiveModal("delete");
    cardToDelete.current = card;
  };

  const handleConfirmCardDelete = () => {
    console.log("Card to delete:", cardToDelete.current);
    if (!cardToDelete.current || !cardToDelete.current._id) {
      console.error("Cannot delete item: Missing item ID or invalid item reference");
      return;
    }
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete.current._id, token)
      .then((res) => {
        console.log("Item deleted successfully:", res);
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete.current._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to delete clothing item from wardrobe:", err);
        alert("Failed to delete item. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    return updateProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to update user profile:", err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error("Failed to like clothing item:", err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error("Failed to unlike clothing item:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    return register({ name, avatar, email, password })
      .then((res) => {
        // Store the real token from the server response
        localStorage.setItem("jwt", res.token);
        // Validate the token and set user state
        return checkToken(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Failed to register new user account:", err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    return login({ email, password })
      .then((res) => {
        // Store the real token from the server response
        localStorage.setItem("jwt", res.token);
        // Validate the token and set user state
        return checkToken(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Failed to authenticate user login:", err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Failed to get user location, using default coordinates:", error);
          setUserLocation({
            latitude: 38.8918,
            longitude: -76.8894,
          });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setUserLocation({
        latitude: 38.8918,
        longitude: -76.8894,
      });
    }
  }, []);

  // Update weather data when location changes
  useEffect(() => {
    if (userLocation) {
      getWeather(userLocation, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          console.log("Weather data set:", filteredData);
          setWeatherData(filteredData);
        })
        .catch((error) => {
          console.error("Failed to fetch weather data:", error);
        });
    }
  }, [userLocation]);

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error('Failed to validate authentication token:', err);
          localStorage.removeItem('jwt');
        });
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched clothing items:", data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items from server:", error.message);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleSwitchChange }}
      >
        <div className="page">
          <div className="page__container">
            <Header 
              handleAddClick={handleAddClick} 
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              onLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                                  <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onEditProfile={handleEditProfile}
                      onLogout={handleLogout}
                      weatherType={weatherData.type}
                      onSelectCard={handleCardClick}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer year={new Date().getFullYear()} />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfile={handleEditProfileSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
          />
          <DeleteItemModal
            activeModal={activeModal}
            card={cardToDelete.current}
            onConfirm={handleConfirmCardDelete}
            onClose={closeActiveModal}
            isOpen={activeModal === "delete"}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
