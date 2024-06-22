// WeatherMap.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-owm/dist/leaflet-owm.css'; // Import Leaflet-OWM styles
import 'leaflet-owm'; // Import Leaflet-OWM library

function WeatherMap({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = '33aa4fc885a1d69e61b66e0dc4ef56d0'; // Replace with your actual OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error state or show user-friendly message
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  useEffect(() => {
    if (weatherData && weatherData.main && typeof weatherData.main.temp !== 'undefined') {
      const map = L.map('map').setView([lat, lon], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Example: Add weather overlay (temperature)
      const temperature = weatherData.main.temp;
      const weatherOverlay = L.OWM.temperature({ temperature, opacity: 0.5 });
      map.addLayer(weatherOverlay);
    }
  }, [weatherData, lat, lon]);

  return (
    <div id="map" style={{ height: '400px', width: '100%' }}></div>
  );
}

export default WeatherMap;
