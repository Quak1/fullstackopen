import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState();

  const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`;
  useEffect(() => {
    axios.get(weatherURL).then((res) =>
      setWeather({
        time: res.data.location.localtime,
        ...res.data.current,
      })
    );
  }, [weatherURL]);

  console.log(weather);

  if (!weather)
    return (
      <>
        <h2>Weather in {city}</h2>
        <div>Loading...</div>
      </>
    );

  return (
    <>
      <h2>Weather in {city}</h2>
      <div>
        <img src={weather.condition.icon} alt={weather.condition.text} />{" "}
        {weather.condition.text}
      </div>
      <div>Time: {weather.time}</div>
      <div>Temperature: {weather.temp_c} Celcius</div>
      <div>Humidity: {weather.humidity}%</div>
      <div>
        Wind: {weather.wind_kph} km/h - {weather.wind_dir}
      </div>
    </>
  );
};

export default Weather;
