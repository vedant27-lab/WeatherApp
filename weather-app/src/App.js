import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherMap from './components/WeatherMap';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    const apiKey = '2c97c635f5d7c9fff9a36ef4b93daee7'; // Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        setWeatherData(response.data);
        setError(null); // Clear any previous errors
      } else {
        setError('No data available for the selected city.'); // Handle empty response
        setWeatherData(null); // Clear weather data on error
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.'); // Set error message
      setWeatherData(null); // Clear weather data on error
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm getWeather={getWeather} />
      {error && <p className="error-message">{error}</p>}
      <WeatherDisplay weatherData={weatherData} />
      {weatherData && <WeatherMap lat={weatherData.coord.lat} lon={weatherData.coord.lon} />}
    </div>
  );
}

export default App;
