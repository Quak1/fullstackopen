import { Entry as EntryType } from "../types";
import { useStateValue } from "../state";

interface Props {
  entry: EntryType;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entry = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.keys(diagnoses).length === 0) return null;

  const Prefix = ({ icon }: { icon: string }) => (
    <>
      <p>
        {entry.date}
        <span className="material-icons">{icon}</span>
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>Diagnose by: {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const color = ["green", "yellow", "red", "black"];

  switch (entry.type) {
    case "Hospital":
      return (
        <div className="entry">
          <Prefix icon="local_hospital" />
          <p>Discharged on: {entry.discharge.date}</p>
        </div>
      );
    case "HealthCheck":
      return (
        <div className="entry">
          <Prefix icon="medical_services" />
          <div
            className="material-icons"
            style={{ color: color[entry.healthCheckRating] }}
          >
            favorite
          </div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div className="entry">
          <Prefix icon="work" />
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick leave from {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </p>
          )}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default Entry;
