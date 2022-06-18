import Country from "./Country";

const Countries = ({ countries, changeFilter }) => {
  const length = countries.length;

  if (length === 0) {
    return <div>No matches</div>;
  } else if (length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (length > 1) {
    return countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}
        <button onClick={changeFilter(country.name.common)}>show</button>
      </div>
    ));
  } else {
    return <Country country={countries[0]} />;
  }
};

export default Countries;
