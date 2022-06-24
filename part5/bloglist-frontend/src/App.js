import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

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
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const newBlogFormRef = useRef();

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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    timedMessage("You have logged out!", setNotification);
  };

  const sendCredentials = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      timedMessage("You have logged in!", setNotification);
      return true;
    } catch (exception) {
      timedMessage("Wrong username or password", setErrorMessage);
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));

      timedMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        setNotification
      );
      newBlogFormRef.current.toggleVisibility();
      return true;
    } catch (exception) {
      timedMessage("Please fill all the required(*) fields", setErrorMessage);
    }
  };

  const likeBlog = async (updateBlog, blogId) => {
    try {
      const res = await blogService.update(updateBlog, blogId);
      const updatedBlogs = blogs.map((b) => {
        if (b.id === blogId)
          return {
            ...b,
            likes: res.likes,
          };
        return b;
      });
      setBlogs(updatedBlogs);
      timedMessage("You liked a post!", setNotification);
    } catch (exception) {
      timedMessage("An error ocurred liking that post", setErrorMessage);
    }
  };

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      ))}
      <button onClick={handleLogout}>logout</button>
    </div>
  );

  const loggedView = () => (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <Toggleable buttonLabel="new blog" ref={newBlogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogList()}
    </>
  );

  return (
    <>
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      {user === null ? (
        <LoginForm sendCredentials={sendCredentials} />
      ) : (
        loggedView()
      )}
    </>
  );
};

export default App;
