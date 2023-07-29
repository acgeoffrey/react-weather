let weatherDetails = localStorage.getItem("cities")
  ? JSON.parse(localStorage.getItem("cities"))
  : [];

// console.log(weatherDetails);

let currentCityLS = JSON.parse(localStorage.getItem("currentCity"));
let addCityNav = false;
let isLoading = false;
let status = "cityNotLoaded";

if (weatherDetails.length > 0) {
  status = "ready";
}

const initialState = {
  city: "",
  currentCity: currentCityLS ? currentCityLS : "",
  position: {},
  weatherDetails,
  status,
  addCityNav,
  isLoading,
  error: "",
};

function reducer(state, action) {
  // console.log(action.type);
  switch (action.type) {
    case "addCity":
      return { ...state, addCityNav: false, city: action.payload };
    case "setLoading":
      return { ...state, isLoading: true };
    case "setLoading/false":
      return { ...state, isLoading: false };
    case "addMoreCity":
      return { ...state, addCityNav: true };
    case "closeAddCity":
      return { ...state, addCityNav: false };
    case "city/position":
      return { ...state, position: action.payload };
    case "setCurrentCity":
      localStorage.setItem("currentCity", JSON.stringify(action.payload));
      return { ...state, currentCity: action.payload, addCityNav: false };
    case "addWeather":
      localStorage.setItem(
        "currentCity",
        JSON.stringify(action.payload.daily.id)
      );
      localStorage.setItem(
        "cities",
        JSON.stringify([...state.weatherDetails, action.payload])
      );
      return {
        ...state,
        isLoading: false,
        city: "",
        position: {},
        currentCity: action.payload.daily.id,
        status: "ready",
        addCityNav: false,
        weatherDetails: [...state.weatherDetails, action.payload],
        lat: action.payload.daily.coord.lat,
        lon: action.payload.daily.coord.lon,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error("Action unknown");
  }
}

export { initialState, reducer };
