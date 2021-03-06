import { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_BORN_YEAR } from "../queries";

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_BORN_YEAR);

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default AuthorForm;
