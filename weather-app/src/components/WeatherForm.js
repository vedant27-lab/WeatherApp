import React, { useState } from 'react';
import './WeatherForm.css';

function WeatherForm({ getWeather }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
        className="weather-input"
      />
      <button type="submit" className="weather-button">Get Weather</button>
    </form>
  );
}

export default WeatherForm;
