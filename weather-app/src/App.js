import React, { useState } from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherMap from './components/WeatherMap';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const getWeather = async (cities) => {
    const apiKey = '33aa4fc885a1d69e61b66e0dc4ef56d0';
    const newWeatherData = [];
    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        newWeatherData.push(response.data);
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    }
    setWeatherData(newWeatherData);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm getWeather={getWeather} />
      {weatherData.map((data, index) => (
        <WeatherDisplay key={index} weatherData={data} />
      ))}
      <WeatherMap weatherData={weatherData} />
    </div>
  );
}

export default App;
