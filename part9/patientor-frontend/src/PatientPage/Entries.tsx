import { Entry as EntryType } from "../types";
import Entry from "./Entry";

interface Props {
  entries: EntryType[];
}

const Entries = ({ entries }: Props) => {
  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry}></Entry>
      ))}
    </>
  );
};

export default Entries;
