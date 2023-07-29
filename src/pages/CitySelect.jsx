import { useEffect, useState } from "react";
import { useWeatherDetails } from "../WeatherContext";
import styles from "../styles/CitySelect.module.css";
import { useGeolocation } from "../hooks/useGeolocation";

function CitySelect() {
  const { dispatch } = useWeatherDetails();
  const [city, setCity] = useState("");

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        dispatch({ type: "city/position", payload: geolocationPosition });
    },
    [geolocationPosition, dispatch]
  );

  return (
    <div className={styles.selectContainer}>
      <div className={styles.gpsContainer}>
        <img src="./../../my_location.svg" alt="set-location" />
        <p>Set Location</p>
        <span>Choose how to set your location for the weather forecast</span>
        <button className="btn btn-gps" onClick={getPosition}>
          <i
            className="fa-solid fa-location-dot"
            style={{ marginRight: "1rem" }}
          ></i>{" "}
          Automatic
        </button>
      </div>
      <p className={styles.orPara}>or</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addCity", payload: city });
        }}
      >
        <input
          type="text"
          value={city}
          placeholder="🔍 &nbsp;Manual Search"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn-city-submit">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
}

export default CitySelect;
