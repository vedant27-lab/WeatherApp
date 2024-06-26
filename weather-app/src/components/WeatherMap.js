import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ lat, lon }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const apiKey = 'your_openweathermap_api_key'; // Replace with your actual OpenWeatherMap API key
    const weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
      attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
      maxZoom: 18
    });

    weatherLayer.addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default WeatherMap;
