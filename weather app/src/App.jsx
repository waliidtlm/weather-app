import { useState, useEffect } from 'react'
import { DateTime } from 'luxon';
import React from 'react'
import axios from "axios"
import './style.css'
import { IoRainyOutline } from "react-icons/io5";
import { BsClouds } from "react-icons/bs";
import { TiWeatherSunny } from "react-icons/ti";
import { IoIosSnow } from "react-icons/io";
import dateBuilder from './components/dateBuilder';
// import renderWeatherIcon from './components/renderWeatherIcon';

function App() {
  const [locationData, setLocationData] = useState(undefined);
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');
  const [localTime, setLocalTime] = useState("");

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
    import.meta.env.VITE_KEY
  }`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(weatherApi);
        setLocationData(response.data);

        if (response.data !== "undefined") {
          const latitude = response.data.coord.lat;
          const longitude = response.data.coord.lon;

          const locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
            import.meta.env.VITE_KEY
          }`;

          const weatherResponse = await axios.get(locationApi);
          setWeatherData(weatherResponse.data);

          // Update local time and timezone using coordinates from the second response
          const timestamp = weatherResponse.data.dt;
          const timezoneOffset = weatherResponse.data.timezone;

          const cityTime = DateTime.fromSeconds(timestamp, {
            zone: `UTC${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset / 3600}`,
          });

          setLocalTime(cityTime.toLocaleString(DateTime.TIME_SIMPLE));
        }
      } catch (err) {
        console.error("Error getting Data", err.message);
      } 
      
    }
  };
  
  const renderWeatherIcon = () => {
    if (weatherData.weather) {
      const currentWeather = weatherData.weather[0].main;
      switch (currentWeather) {
        case "Clouds":
          return <BsClouds size={150} />;
        case "Clear":
          return <TiWeatherSunny size={150} />;
        case "Rain":
          return <IoRainyOutline size={150} />;
        case "Snow":
          return <IoIosSnow size={150} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter Location"
          maxLength={20}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
        />
      </div>

      { locationData !== undefined && (
        <div className="container">
        <div className="top">
          <div className="location">
            <h2>{weatherData.name}</h2>
            {weatherData.sys ? <h3>{weatherData.sys.country}</h3> : null}
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()}℃</h1>
            ) : null}
          </div>
          <div className="date">
            <p>{dateBuilder(new Date())}</p>
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
          <div className="weather-icon">{renderWeatherIcon()}</div>
          <div className="details">
            {weatherData.weather ? (
              <p>{weatherData.weather[0].description}</p>
            ) : null}
          </div>
        </div>

        <div className="time">
          <div>
            <h1 className="hours">{localTime.split(":")[0]}</h1>
          </div>
          :
          <div>
            <h2 className="minutes">{localTime.split(":")[1]}</h2>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {weatherData.main ? (
              <p>{weatherData.main.feels_like.toFixed()}℃</p>
            ) : (
              "_"
            )}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {weatherData.main ? <p>{weatherData.main.humidity}%</p> : "_"}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {weatherData.wind ? <p>{weatherData.wind.speed} Km/h</p> : "_"}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
    

export default App


