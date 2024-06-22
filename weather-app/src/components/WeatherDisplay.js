import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weatherData }) {
  if (!weatherData) return <div className="weather-display">No data available</div>;

  return (
    <div className="weather-display">
      <h2>{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>Conditions: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default WeatherDisplay;
