import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((data) => setCountries(data));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSelectedCountry(null);
  };

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  let content = null;

  if (search !== "") {
    if (selectedCountry) {
      content = <CountryDetails country={selectedCountry} />;
    } else if (filtered.length > 10) {
      content = <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
      content = (
        <CountryList countries={filtered} onShow={setSelectedCountry} />
      );
    } else if (filtered.length === 1) {
      content = <CountryDetails country={filtered[0]} />;
    }
  }

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        find countries: <input value={search} onChange={handleChange} />
      </div>

      {content}
    </div>
  );
};

export default App;
