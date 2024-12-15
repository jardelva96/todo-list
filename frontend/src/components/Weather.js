import React, { useState, useEffect } from 'react';
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Função para pegar a localização atual do usuário
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError('Erro ao obter localização');
        }
      );
    } else {
      setError('Geolocalização não suportada pelo navegador');
    }
  };

  // Função para buscar o clima
  const fetchWeather = async () => {
    if (latitude && longitude) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar clima');
        }
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    getLocation(); // Obtém a localização do usuário
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(); // Busca o clima assim que a localização for obtida
    }
  }, [latitude, longitude]);

  return (
    <div className="weather-container">
      {error && <p className="error">{error}</p>}
      {weather ? (
        <div className="weather-info">
          <p><strong>Temperatura:</strong> {weather.temperature}°C</p>
          <p><strong>Vento:</strong> {weather.windspeed} km/h</p>
          <p><strong>Direção do vento:</strong> {weather.winddirection}°</p>
        </div>
      ) : (
        <p>Carregando clima...</p>
      )}
    </div>
  );
};

export default Weather;
