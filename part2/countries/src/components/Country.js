import Languages from "./Languages";

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
    </>
  );
};

export default Country;
