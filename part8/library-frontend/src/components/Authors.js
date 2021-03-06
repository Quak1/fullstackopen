import { useQuery } from "@apollo/client";

import AuthorForm from "./AuthorForm";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const res = useQuery(ALL_AUTHORS);

  if (!props.show || res.loading) return null;

  const authors = res.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authors={authors} />
    </div>
  );
};

export default Authors;
