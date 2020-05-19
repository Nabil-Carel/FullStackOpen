import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const url = "https://restcountries.eu/rest/v2/all";
  const hook = () => {
    axios.get(url).then(
      (response) => {
        setCountries(response.data);
      },
      (error) => console.log(error)
    );
  };

  useEffect(hook, []);

  const onFilterChange = (event) => setFilter(event.target.value);
  const filteredContent = countries.filter((elem) =>
    elem.name.toLowerCase().includes(filter.toLowerCase())
  );

  const contentDisplayed =
    filteredContent.length > 10 ? (
      <p>Too many matches,specify another filter</p>
    ) : (
      <Display countries={filteredContent} />
    );
  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={onFilterChange} />
      </div>
      {contentDisplayed}
    </div>
  );
}

export default App;
