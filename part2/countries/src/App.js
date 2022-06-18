import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const changeFilter = (name) => () => setFilter(name);

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {countries.length === 0 ? (
          "Loading..."
        ) : (
          <Countries
            countries={filteredCountries}
            changeFilter={changeFilter}
          />
        )}
      </div>
    </>
  );
}

export default App;
