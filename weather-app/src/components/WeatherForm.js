import React, { useState } from 'react';
import './WeatherForm.css'; // Import the CSS file

const WeatherForm = ({ getWeather }) => {
  const [cities, setCities] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityList = cities.split(',').map(city => city.trim());
    getWeather(cityList);
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={cities}
        onChange={(e) => setCities(e.target.value)}
        placeholder="Enter cities separated by commas"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
