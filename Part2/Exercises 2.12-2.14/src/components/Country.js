import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fetchDone, setFetchDone] = useState(false);
  const capital = country.capital;
  const key = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`;

  const hook = () => {
    axios.get(url).then((response) => {
      setCurrentWeather(response.data);
      setFetchDone(true);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      {fetchDone ? (
        <>
          <h1>{country.name}</h1>
          <p>
            {"capital " + country.capital}
            <br /> {"population " + country.population}
          </p>

          <h2>languages</h2>
          <ul>
            {country.languages.map((elem) => (
              <li key={elem.name}>{elem.name}</li>
            ))}
          </ul>
          <br />
          <img
            src={country.flag}
            alt="flag"
            style={{ width: "6em", height: "4em" }}
          />
          <Weather
            capital={capital}
            temperature={currentWeather.current.temperature}
            weatherIcon={currentWeather.current.weather_icons[0]}
            windSpeed={currentWeather.current.wind_speed}
            windDirection={currentWeather.current.wind_dir}
          />
        </>
      ) : null}
    </div>
  );
};

export default Country;
