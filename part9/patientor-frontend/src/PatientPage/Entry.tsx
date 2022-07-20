import { Entry as EntryType } from "../types";
import { useStateValue } from "../state";

interface Props {
  entry: EntryType;
}

const Entry = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.keys(diagnoses).length === 0) return null;

  return (
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
  );
};

export default Entry;
