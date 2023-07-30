import { useWeatherDetails } from "../WeatherContext";
import styles from "../styles/AddMoreCities.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import { useEffect, useState } from "react";

function AddMoreCities() {
  const { weatherDetails, dispatch } = useWeatherDetails();
  // console.log("WEATHER", weatherDetails);
  const [city, setCity] = useState("");

  const { position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        dispatch({ type: "city/position", payload: geolocationPosition });
    },
    [geolocationPosition, dispatch]
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "addCity", payload: city });
  }

  return (
    <div className={styles.addMoreContainer}>
      <div className={styles.header}>
        <i
          className="fa-solid fa-arrow-left"
          onClick={() => dispatch({ type: "closeAddCity" })}
        ></i>
        <h2>Add Cities</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <input
            placeholder="Add City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn-city-submit">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </form>

      <button className={styles.btnAddMore} onClick={getPosition}>
        <i
          className="fa-solid fa-location-dot"
          style={{ marginRight: "1rem" }}
        ></i>{" "}
        My Location
      </button>

      <div className={styles.savedLocationsContainer}>
        <h3>SAVED LOCATIONS</h3>
        {weatherDetails.map((city) => (
          <div key={city.daily.id} className={styles.savedCityContainer}>
            <div
              className={styles.savedCity}
              onClick={() =>
                dispatch({ type: "setCurrentCity", payload: city.daily.id })
              }
            >
              <h4>{city.daily.name}</h4>
              <p>{city.daily.sys.country}</p>
            </div>
            <div
              onClick={() =>
                dispatch({ type: "city/delete", payload: city.daily.id })
              }
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddMoreCities;
