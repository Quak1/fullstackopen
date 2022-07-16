import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const res = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("all genres");

  if (!props.show || res.loading) return null;

  const books = res.data.allBooks;
  const genresList = books.reduce(
    (genres, book) => {
      book.genres.forEach((genre) => {
        if (!genres.includes(genre)) genres.push(genre);
      });
      return genres;
    },
    ["all genres"]
  );

  const filteredBooks =
    genre === "all genres"
      ? books
      : books.filter((book) => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>

      <p>
        search by genre:
        <select value={genre} onChange={({ target }) => setGenre(target.value)}>
          {genresList.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
      </p>
      <BooksTable books={filteredBooks} />
    </div>
  );
};

export default Books;
