import { useWeatherDetails } from "../WeatherContext";
import DetailComponent from "../components/DetailComponent";
import Forecast from "../components/Forecast";
import WeatherCard from "../components/WeatherCard";
import styles from "../styles/Home.module.css";

function Home() {
  const { currentCity, weatherDetails } = useWeatherDetails();
  const filteredWeatherData = weatherDetails.filter(
    (data) => data.daily.id === currentCity
  );
  const { daily, weekly } = filteredWeatherData[0];
  const { name, main, weather, wind } = daily;
  console.log("Hello: ", weatherDetails);

  let chart = {
    tempArr: [],
    windArr: [],
  };
  function temperature(arr) {
    for (let i = 0; i < 16; i++) {
      chart.tempArr.push({
        ...arr[i].main,
        temp: Math.round(arr[i].main.temp),
        time: new Date(arr[i].dt * 1000)
          .toLocaleTimeString("en-GB", {
            hour12: false,
          })
          .substring(0, 5),
      });

      chart.windArr.push({
        ...arr[i].wind,
        speed: Math.ceil(arr[i].wind.speed),
        time: new Date(arr[i].dt * 1000)
          .toLocaleTimeString("en-GB", {
            hour12: false,
          })
          .substring(0, 5),
      });
    }
    console.log(chart);
  }

  temperature(weekly.list);

  return (
    <div className={styles.homeContainer}>
      <WeatherCard />
      <div className={styles.detailsContainer}>
        <h2>Details</h2>
        <div className={styles.detailsCompContainer}>
          <DetailComponent
            icon={<i className="fa-solid fa-water"></i>}
            data1={main.feels_like}
            unit={"°"}
            description="Feels like"
          />
          <DetailComponent
            icon={<i className="fa-solid fa-temperature-three-quarters"></i>}
            data1={main.temp_max}
            data2={main.temp_min}
            unit={"°"}
            description="Max | Min"
          />
          <DetailComponent
            icon={<i className="fa-solid fa-gauge"></i>}
            data1={main.pressure}
            unit={"hPa"}
            description="Pressure"
          />
          <DetailComponent
            icon={<i className="fa-solid fa-wind"></i>}
            data1={wind.speed}
            unit={"km/h"}
            description="Wind Speed"
          />
          <Forecast data={chart} />
        </div>
      </div>
    </div>
  );
}

export default Home;
