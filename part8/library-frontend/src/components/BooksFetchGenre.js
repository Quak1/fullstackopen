import { useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import { GENRES, BOOKS_BY_GENRE, BOOK_ADDED } from "../queries";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");
  const resGenres = useQuery(GENRES);
  const resByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre === "all genres" ? null : genre },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(book.title);
    },
  });

  if (!props.show || resGenres.loading) return null;

  const genresList = resGenres.data.allBooks.reduce(
    (genres, book) => {
      book.genres.forEach((genre) => {
        if (!genres.includes(genre)) genres.push(genre);
      });
      return genres;
    },
    ["all genres"]
  );

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
      {!resByGenre.loading ? (
        <BooksTable books={resByGenre.data.allBooks} />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Books;
