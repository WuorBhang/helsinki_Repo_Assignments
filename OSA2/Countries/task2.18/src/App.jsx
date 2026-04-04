import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const renderCountries = () => {
    if (search === "") return null;

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Area: {country.area}</p>

          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages || {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img src={country.flags.png} alt="flag" width="150" />
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleChange} />
      </div>

      {renderCountries()}
    </div>
  );
};

export default App;
