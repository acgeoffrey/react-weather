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
  let day;
  const time24format = Number(
    new Date()
      .toLocaleTimeString("en-GB", {
        hour12: false,
      })
      .substring(0, 2)
  );
  // console.log(time24format);
  if (time24format <= 6 || time24format >= 18) {
    // console.log("dark");
    day = "dark";
  } else {
    // console.log("day");
    day = "day";
  }

  let weatherMain;

  switch (weather[0].main.toLowerCase()) {
    case "clouds":
      weatherMain = day == "day" ? "cloudy" : "cloudy-dark";
      break;
    case "rain":
      weatherMain = day == "day" ? "rain" : "rain-dark";
      break;
    case "clear":
      weatherMain = day == "day" ? "clear" : "clear-dark";
      break;
    case "haze":
      weatherMain = day == "day" ? "haze" : "haze-dark";
      break;
    default:
      weatherMain = day == "day" ? "sunny" : "night";
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
      <div className={styles.navDiv}>
        <button onClick={() => dispatch({ type: "refresh/true" })}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <div
          className={styles.navIcon}
          onClick={() => dispatch({ type: "addMoreCity" })}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
