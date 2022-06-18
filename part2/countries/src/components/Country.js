import Languages from "./Languages";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <div>
        <strong>languages:</strong>
      </div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="Flag" />
      <Weather city={country.capital[0]} />
    </>
  );
};

export default Country;
