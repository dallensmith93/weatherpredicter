import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'f079dcb17e87958f246cd5604fa53c69'; // Replace with your weather API key

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city.');
      return;
    }

    setError('');

    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 weather-card">
        <h1 className="text-center mb-4">Weather App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={getWeather}>
            Search
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {weather && (
          <div className="text-center">
            <h2 className="mt-4">{weather.name}, {weather.sys.country}</h2>
            <h3 className="display-4">{Math.round(weather.main.temp)}°C</h3>
            <p className="lead">{weather.weather[0].description.toUpperCase()}</p>
            <div className="d-flex justify-content-between">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {Math.round(weather.wind.speed)} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
