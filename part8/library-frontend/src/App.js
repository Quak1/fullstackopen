import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import BooksFetchGenre from "./components/BooksFetchGenre";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

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
