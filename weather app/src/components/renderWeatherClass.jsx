import React from 'react'

function renderWeatherClass(weatherData) {
    if (weatherData.weather) {
        switch (weatherData.weather[0].main) {
          case 'Snow':
            return 'app snow';
          case 'Clear':
            return 'app sunny';
          case 'Rain':
            return 'app rain';
          case 'Clouds':
            return 'app cloud';
          default:
            return 'app';
        }
      } else {
        return 'app';
      }
}

export default renderWeatherClass