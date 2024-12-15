import React, { useEffect, useState } from 'react';

const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Obtendo a localização atual do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter a localização: ", error);
          alert("Não foi possível obter sua localização.");
        }
      );
    } else {
      alert("Geolocalização não é suportada neste navegador.");
    }
  }, []);

  if (!location) {
    return <div>Carregando mapa...</div>;
  }

  const { latitude, longitude } = location;
  const openStreetMapURL = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik`;

  return (
    <div>
      <h3>Mapa da sua localização:</h3>
      <iframe
        title="Mapa de Localização"
        src={openStreetMapURL}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
