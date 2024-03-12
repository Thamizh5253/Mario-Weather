import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./task.css";
import Like from "./like";
import Ques from "./ques";

import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [apiKey, setApi] = useState(null);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        // console.log("hi");

        // console.log(weatherData.coord.lon);

        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message || "Error fetching weather data.");
      }
    } catch (error) {
      setWeatherData(null);
      setError("An error occurred while fetching weather data.");
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://authen-server.vercel.app/api/getApiKey"
        );
        const data = await response.json();

        toast.success("🦄 API Key fetched!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        // console.log(data.api);

        setApi(data.api);
      } catch (error) {
        toast.error("🪲 There is a BUG in Getting API Key", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    };

    fetchApi();
  }, []);

  return (
    <div className="con">
      <div className="headdiv">
        <h1 className="head">Mario-Weather App</h1>
      </div>

      <form onSubmit={handleFormSubmit} className="form">
        <label className="lab">Enter City</label>
        <input type="text" placeholder="city name" value={city} onChange={handleInputChange} />
        <button className="btn" type="submit">
          Get Weather
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="data">
        {weatherData && (
          <div className="dataele">
            <div className="city">
              <h2>
                Weather in {weatherData.name}, {weatherData.sys.country}
              </h2>
            </div>
            <div className="temp">
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Longitude: {weatherData.coord.lon} °</p>
              <p>Latitude: {weatherData.coord.lat} °</p>
              <p>Ground Level: {weatherData.main.grnd_level} m</p>
              <p>Sea Level: {weatherData.main.sea_level} m</p>
            </div>
            <Like></Like>
            <Ques></Ques>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
