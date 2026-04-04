import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (capital) {
      weatherService.getWeather(capital).then((data) => {
        setWeather(data);
      });
    }
  }, [capital]);

  if (!weather) return null;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>

      {/* Display the weather icon */}
      <img src={iconUrl} alt={weather.weather[0].description} />

      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
