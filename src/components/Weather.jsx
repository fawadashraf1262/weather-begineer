import React, { useState } from "react";
import "./Weather.css";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import search from "../assets/search.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const WeatherComponent = () => {
  const [wicon, setWicon] = useState(clear);

  const searchWeather = async () => {
    try {
      const element = document.getElementsByClassName("cityInput");
      if (element[0].value === "") {
        return 0;
      }
      let api_key = "8af08814626fc2e967243325a312efd9";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      const humidity = document.getElementsByClassName("humidity");
      const windspeed = document.getElementsByClassName("windspeed");
      const temperature = document.getElementsByClassName("temp");
      const cityname = document.getElementsByClassName("city");

      humidity[0].innerHTML = Math.floor(data.main.humidity);
      windspeed[0].innerHTML = Math.floor(data.wind.speed);
      temperature[0].innerHTML = Math.floor(data.main.temp);
      cityname[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow);
      } else {
        setWicon(clear);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-row">
        <input type="text" className="cityInput" placeholder="Enter city" />
        <div
          className="search"
          onClick={() => {
            searchWeather();
          }}
        >
          <img src={search} alt="" />
        </div>
      </div>
      <div className="weather-info">
        <img src={cloud} alt="Weather Icon" />
        <p className="temp">25°C</p>
        <p className="city">London</p>
      </div>
      <div className="details-row">
        <div className="details-column">
          <p>Humidity</p>
          <div className="imgp">
            <img src={humidity} alt="Humidity Icon" />
            <p className="humidity">50%</p>
          </div>
        </div>
        <div className="details-column">
          <p>Wind Speed</p>
          <div className="imgp">
            <img src={wind} alt="Wind Icon" />
            <p className="windspeed">5 m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
