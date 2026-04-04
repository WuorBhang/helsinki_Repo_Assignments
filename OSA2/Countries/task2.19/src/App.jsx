import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSelected(null);
  };

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const showDetails = (c) => (
    <div>
      <h2>{c.name.common}</h2>
      <p>Capital: {c.capital?.[0]}</p>
      <p>Area: {c.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(c.languages || {}).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={c.flags.png} alt="" width="150" />
    </div>
  );

  let content = null;

  if (search !== "") {
    if (selected) {
      content = showDetails(selected);
    } else if (filtered.length > 10) {
      content = <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
      content = (
        <ul>
          {filtered.map((c) => (
            <li key={c.cca3}>
              {c.name.common}
              <button onClick={() => setSelected(c)}>show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filtered.length === 1) {
      content = showDetails(filtered[0]);
    }
  }

  return (
    <div>
      find countries: <input value={search} onChange={handleChange} />
      {content}
    </div>
  );
};

export default App;
