import { useEffect, useState } from "react";
import styles from "../styles/Forecast.module.css";
import DetailButton from "./DetailButton";
import ForecastChart from "./ForecastChart";

function Forecast({ data }) {
  const [activeProperty, setActiveProperty] = useState("temp");
  // console.log("FORECAST COMPONENT LOADED");
  let chartData, unit;
  if (activeProperty === "temp") {
    chartData = data.tempArr;
    // unit = "°c";
    unit = "deg";
  }
  if (activeProperty === "speed") {
    chartData = data.windArr;
    unit = "km/h";
  }
  if (activeProperty === "humidity") {
    chartData = data.tempArr;
    unit = "%";
  }

  return (
    <div className={styles.forecastContainer}>
      <h2>3 Hour Weather</h2>
      <p>48-Hour forecast</p>
      <DetailButton
        icon={<i className="fa-solid fa-temperature-three-quarters"></i>}
        text="Temperature"
        property="temp"
        activeProperty={activeProperty}
        setActiveProperty={setActiveProperty}
      />
      <DetailButton
        icon={<i className="fa-solid fa-wind"></i>}
        text="Wind"
        property="speed"
        activeProperty={activeProperty}
        setActiveProperty={setActiveProperty}
      />
      <DetailButton
        icon={<i className="fa-solid fa-droplet"></i>}
        text="Humidity"
        property="humidity"
        activeProperty={activeProperty}
        setActiveProperty={setActiveProperty}
      />
      <br />
      <span className={styles.unit}>{unit}</span>
      <ForecastChart data={chartData} dataKey={activeProperty} />
    </div>
  );
}

export default Forecast;
