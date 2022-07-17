import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import { BOOKS_BY_GENRE, BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import BooksFetchGenre from "./components/BooksFetchGenre";

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (books) => {
    const seen = new Set();
    return books.filter((item) => {
      const t = item.title;
      return seen.has(t) ? false : seen.add(t);
    });
  };

  cache.updateQuery(query, (data) => {
    if (!data) return undefined;
    const { allBooks } = data;
    return { allBooks: uniqueByTitle(allBooks.concat(addedBook)) };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCache(
        client.cache,
        { query: BOOKS_BY_GENRE, variables: { genre: null } },
        addedBook
      );
      addedBook.genres.forEach((genre) => {
        updateCache(
          client.cache,
          { query: BOOKS_BY_GENRE, variables: { genre } },
          addedBook
        );
      });
    },
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommended
            </button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />
      {/* <Books show={page === "books"} /> */}
      <BooksFetchGenre show={page === "books"} />
      <NewBook show={page === "add"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommendations show={page === "recommendations"} />
    </div>
  );
};

export default App;
