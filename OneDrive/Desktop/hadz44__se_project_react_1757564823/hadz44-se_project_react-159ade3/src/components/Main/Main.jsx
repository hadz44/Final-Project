import { useContext } from "react";
import "../Main/Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems = [], onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log("Weather data in Main:", weatherData);
  console.log("Clothing items in Main:", clothingItems);
  
  const filteredItems = clothingItems.filter((item) => {
    console.log("Comparing item weather:", item.weather, "with weather type:", weatherData.type);
    // If weather type is empty, show all items
    if (!weatherData.type) {
      return true;
    }
    return item.weather.toLowerCase() === weatherData.type.toLowerCase();
  });
  console.log("Filtered items:", filteredItems);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
