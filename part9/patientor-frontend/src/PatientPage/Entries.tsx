import { Entry } from "../types";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
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
              entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Entries;
