// WeatherMap.js

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

const WeatherMap = ({ weatherData }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);
    }

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.current.removeLayer(layer);
      }
    });

    weatherData.forEach(data => {
      const { lat, lon } = data.coord;
      const marker = L.marker([lat, lon]).addTo(mapInstance.current);
      marker.bindPopup(`<b>${data.name}</b><br>Temperature: ${data.main.temp} °C`);
    });
  }, [weatherData]);

  return <div ref={mapRef} className="map-container" />;
};

export default WeatherMap;
