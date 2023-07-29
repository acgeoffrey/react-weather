import { useWeatherDetails } from "../WeatherContext";
import Home from "../pages/Home";
import Loader from "./Loader";
import CitySelect from "../pages/CitySelect";
import AddMoreCities from "./AddMoreCities";

function App() {
  const { status, isLoading, addCityNav } = useWeatherDetails();

  console.log("STATUS: ", status);
  console.log("addCityNav: ", addCityNav);

  if (isLoading) return <Loader />;
  if (addCityNav) return <AddMoreCities />;
  else if (status === "cityNotLoaded") return <CitySelect />;
  else if (status === "ready") return <Home />;
}

export default App;
