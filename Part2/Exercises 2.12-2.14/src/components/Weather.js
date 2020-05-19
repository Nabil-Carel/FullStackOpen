import React from "react";

const Weather = ({
  capital,
  temperature,
  weatherIcon,
  windSpeed,
  windDirection,
}) => (
  <div>
    <h2>{`Weather in ${capital}`}</h2>
    <p>
      <b>temperature:</b>
      {` ${temperature} Celsius`}
    </p>
    <img src={weatherIcon} alt="weather" />
    <p>
      <b>wind:</b>
      {` ${windSpeed} mph direction ${windDirection}`}
    </p>
  </div>
);

export default Weather;
