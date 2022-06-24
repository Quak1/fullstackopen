import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const timedMessage = (message, setter, time = 5000) => {
  setter(message);
  setTimeout(() => {
    setter(null);
  }, time);
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
      timedMessage("You have logged in!", setNotification);
    } catch (exception) {
      timedMessage("Wrong username or password", setErrorMessage);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    timedMessage("You have logged out!", setNotification);
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = { title, author, url };
      const createdBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      timedMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        setNotification
      );
    } catch (exception) {
      timedMessage("Please fill all the required(*) fields", setErrorMessage);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button onClick={handleLogout}>logout</button>
    </div>
  );

  const newBlog = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        Title*{" "}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author*{" "}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url{" "}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  const loggedView = () => (
    <>
      <p>{user.name} logged in</p>
      <h2>create new</h2>
      {newBlog()}
      {blogList()}
    </>
  );

  return (
    <>
      <h2>{user === null ? "log in to application" : "blogs"}</h2>
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      {user === null ? loginForm() : loggedView()}
    </>
  );
};

export default App;
