import { useWeatherDetails } from "../WeatherContext";
import styles from "../styles/WeatherCard.module.css";

function WeatherCard() {
  const { currentCity, weatherDetails, dispatch } = useWeatherDetails();
  const filteredWeatherData = weatherDetails.filter(
    (data) => data.daily.id === currentCity
  );
  const { daily } = filteredWeatherData[0];
  const { name, main, weather } = daily;
  const lastUpdated = new Date(daily.dt * 1000).toLocaleTimeString();
  const day = lastUpdated.substring(9, 11);
  let weatherMain;

  switch (weather[0].main.toLowerCase()) {
    case "clouds":
      weatherMain = day == "AM" ? "cloudy" : "cloudy-dark";
      break;
    case "rain":
      weatherMain = day == "AM" ? "rain" : "rain-dark";
      break;
    case "clear":
      weatherMain = day == "AM" ? "clear" : "clear-dark";
      break;
    default:
      weatherMain = day == "AM" ? "sunny" : "night";
  }

  return (
    <div
      className={styles.cardContainer}
      style={{
        backgroundImage: `url(${`./images/${weatherMain}.jpg`})`,
      }}
    >
      <h2 className={styles.mainTemp}>{Math.ceil(main.temp)}&deg;</h2>
      <div className={styles.cityWeather}>
        <h4>{name}</h4>
        <h4>{weather[0].main}</h4>
        {/* <h4>{weather[0].description}</h4> */}
      </div>
      <p className={styles.lastUpdated}>
        Last updated: <span>{lastUpdated}</span>
      </p>
      <div
        className={styles.navIcon}
        onClick={() => dispatch({ type: "addMoreCity" })}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      <button onClick={() => dispatch({ type: "refresh/true" })}>
        refresh
      </button>
    </div>
  );
}

export default WeatherCard;
