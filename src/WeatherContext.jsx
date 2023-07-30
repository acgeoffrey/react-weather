import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { initialState, reducer } from "./reducer";
import toast, { Toaster } from "react-hot-toast";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [
    {
      city,
      currentCity,
      position,
      status,
      weatherDetails,
      isLoading,
      addCityNav,
      refresh,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const KEY = import.meta.env.VITE_REACT_KEY;

  const CITY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
  const POS_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${KEY}&units=metric`;
  const CITY_FC_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=metric`;
  const POS_FC_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lng}&appid=${KEY}&units=metric`;

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchWeather() {
        try {
          // console.log("FETCHING WEATHER");
          dispatch({ type: "setLoading" });

          let daily, weekly;
          if (position.lat) {
            daily = await fetch(POS_URL, { signal: controller.signal });
            weekly = await fetch(POS_FC_URL, { signal: controller.signal });
          }

          if (city) {
            daily = await fetch(CITY_URL, { signal: controller.signal });
            weekly = await fetch(CITY_FC_URL, { signal: controller.signal });
          }

          const dataDaily = await daily.json();
          const dataWeekly = await weekly.json();
          if (daily?.status == 200 && weekly?.status == 200) {
            for (let i = 0; i < weatherDetails.length; i++) {
              if (weatherDetails[i].daily.id == dataDaily.id) {
                toast.error("City already exists!", {
                  position: "bottom-center",
                });
                dispatch({ type: "setLoading/false" });
                return;
              }
            }

            dispatch({
              type: "addWeather",
              payload: { daily: dataDaily, weekly: dataWeekly },
            });
          } else {
            dispatch({ type: "error", payload: dataDaily.message });
            toast.error(dataDaily.message, { position: "bottom-center" });
          }
        } catch (err) {
          toast.error("Check your Connection", {
            duration: 10000,
            position: "bottom-center",
          });
          dispatch({ type: "setLoading/false" });
        }
      }

      if (city.length > 2 || position.lat) {
        // console.log("fetch function initiated");

        toast.promise(
          fetchWeather(),
          {
            loading: "Fetching Weather Data...",
            success: "Done",
            error: "Error Fetching Data",
          },
          { position: "bottom-center" }
        );
      }

      //Cleanup function
      return function () {
        controller.abort();
      };
    },
    [CITY_URL, POS_URL, city, position, CITY_FC_URL, POS_FC_URL, weatherDetails]
  );

  useEffect(
    function () {
      async function refreshFunction() {
        const refreshCity = weatherDetails.filter(
          (city) => currentCity === city.daily.id
        );
        if (refreshCity.length < 1) return;
        const lat = refreshCity[0].daily.coord.lat;
        const lon = refreshCity[0].daily.coord.lon;

        const daily = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
        );
        const dailyData = await daily.json();

        const weekly = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
        );
        const weeklyData = await weekly.json();
        // toast.success("done", { position: "bottom-center" });
        dispatch({
          type: "refresh/done",
          payload: { daily: dailyData, weekly: weeklyData },
        });
      }

      // console.log(refresh);
      if (refresh) {
        toast.promise(
          refreshFunction(),
          {
            loading: "Refreshing...",
            success: "Done",
            error: "Error refreshing",
          },
          { position: "bottom-center" }
        );
      }
    },
    [refresh, KEY, weatherDetails, currentCity]
  );

  const value = useMemo(() => {
    return {
      city,
      currentCity,
      position,
      status,
      isLoading,
      weatherDetails,
      dispatch,
      addCityNav,
      refresh,
    };
  }, [
    addCityNav,
    city,
    currentCity,
    isLoading,
    position,
    refresh,
    status,
    weatherDetails,
  ]);

  return (
    <WeatherContext.Provider value={value}>
      {children}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "1.5rem",
            textTransform: "uppercase",
          },
        }}
      />
    </WeatherContext.Provider>
  );
}

function useWeatherDetails() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("WeatherContext was used outside of the WeatherProvider");
  return context;
}

export { WeatherProvider, useWeatherDetails };
