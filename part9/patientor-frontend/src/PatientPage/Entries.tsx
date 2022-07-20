import { Entry } from "../types";
import { useStateValue } from "../state";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.keys(diagnoses).length === 0) return null;

  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Entries;
