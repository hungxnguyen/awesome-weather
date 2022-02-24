import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = (e) => {
    e?.preventDefault();

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: inputRef.current.value || "Tokyo", // "Austin,us",
        units: "imperial",
      },
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "fa2d100d99mshb5d65a633deac80p1c7f0ajsn5ab457aded78",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("fetched the weather data!");
        console.log(response);
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const determineBackgroundImage = () => {
      if (weatherInfo?.main.temp <= 32) {
        setImage(
          "https://images.unsplash.com/photo-1519944159858-806d435dc86b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        );
      } else if (weatherInfo?.main.temp <= 53) {
        setImage(
          "https://images.unsplash.com/photo-1591420699297-88e82958f324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        );
      } else if (weatherInfo?.main.temp <= 74) {
        setImage(
          "https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80"
        );
      } else if (weatherInfo?.main.temp <= 79) {
        setImage(
          "https://images.unsplash.com/photo-1602798415471-595a19ef43e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"
        );
      } else if (weatherInfo?.main.temp <= 150) {
        setImage(
          "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
        );
      } else {
        setImage(
          "https://images.unsplash.com/photo-1641641719834-5f1b8d2c7b75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1536&q=80"
        );
      }
    };

    determineBackgroundImage();
  }, [weatherInfo]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="app__container">
        <div className="app__left app__info">
          <h1>Awesome Weather</h1>
          <form className="app__form">
            <input ref={inputRef} type="text" placeholder="Type the city" />
            <button type="submit" onClick={fetchWeatherData}>
              Show me the weather
            </button>
          </form>
        </div>

        <div className="app__right app__info">
          <h1>{weatherInfo?.name}</h1>

          {weatherInfo ? (
            <div className="weather">
              <h3>Feels like {Math.floor(weatherInfo.main.feels_like)}° </h3>
              <h3>
                Sunrise: {moment.unix(weatherInfo.sys.sunrise).format("LT")}
              </h3>
              <h3>
                Sunset: {moment.unix(weatherInfo.sys.sunset).format("LT")}
              </h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
