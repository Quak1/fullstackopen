import { useQuery } from "@apollo/client";

import { ME, ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

const Recommendations = (props) => {
  const resBooks = useQuery(ALL_BOOKS);
  const resMe = useQuery(ME);

  if (!props.show || resMe.loading || resBooks.loading) return null;

  const favouriteGenre = resMe.data.me.favouriteGenre;
  const books = resBooks.data.allBooks;

  const filteredBooks = books.filter((book) =>
    book.genres.includes(favouriteGenre)
  );

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <BooksTable books={filteredBooks} />
    </>
  );
};

export default Recommendations;
