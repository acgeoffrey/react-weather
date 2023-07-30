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
  currentCity: currentCityLS ? currentCityLS : 0,
  position: {},
  weatherDetails,
  status,
  addCityNav,
  isLoading,
  refresh: false,
  error: "",
};

function reducer(state, action) {
  // console.log(action.type);
  let filteredArray = [];
  let filteredArrayAfterDelete = [];

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
      return {
        ...state,
        currentCity: action.payload,
        addCityNav: false,
        refresh: true,
      };
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
        refresh: false,
        weatherDetails: [...state.weatherDetails, action.payload],
        lat: action.payload.daily.coord.lat,
        lon: action.payload.daily.coord.lon,
      };
    case "refresh/true":
      return { ...state, refresh: true };
    case "refresh/done":
      for (let i = 0; i < state.weatherDetails.length; i++) {
        if (state.currentCity === state.weatherDetails[i].daily.id) {
          filteredArray.push(action.payload);
        } else {
          filteredArray.push(state.weatherDetails[i]);
        }
      }

      localStorage.setItem("cities", JSON.stringify(filteredArray));
      return {
        ...state,
        refresh: false,
        weatherDetails: filteredArray,
      };

    case "city/delete":
      filteredArrayAfterDelete = state.weatherDetails.filter(
        (city) => city.daily.id != action.payload
      );

      if (filteredArrayAfterDelete.length > 0) {
        let tempCurrentCity = state.currentCity;
        if (action.payload == tempCurrentCity) {
          tempCurrentCity = filteredArrayAfterDelete[0].daily.id;
        }
        localStorage.setItem("currentCity", JSON.stringify(tempCurrentCity));
        localStorage.setItem(
          "cities",
          JSON.stringify(filteredArrayAfterDelete)
        );

        return {
          ...state,
          weatherDetails: filteredArrayAfterDelete,
          currentCity: tempCurrentCity,
        };
      } else {
        localStorage.clear();
        return {
          ...state,
          status: "cityNotLoaded",
          addCityNav: false,
          weatherDetails: [],
          position: {},
          currentCity: 0,
        };
      }

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
