import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { timedMessage } from "./utils";
import { createBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errorMessage = useSelector((state) => state.notifications.error);
  const notification = useSelector((state) => state.notifications.notification);
  const newBlogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
    timedMessage(dispatch, "You have logged out!", "notification");
  };

  const funcreateBlog = async (blog) => {
    try {
      /* const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog)); */
      dispatch(createBlog(blog));

      /* timedMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        setNotification
      ); */
      newBlogFormRef.current.toggleVisibility();
      return true;
    } catch (exception) {
      timedMessage(dispatch, "Please fill all the required(*) fields", "error");
    }
  };

  const loggedView = () => (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <Toggleable buttonLabel="new blog" ref={newBlogFormRef}>
        <BlogForm createBlog={funcreateBlog} />
      </Toggleable>
      <BlogList />
      <button onClick={handleLogout}>logout</button>
    </>
  );

  return (
    <>
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      {user === null ? <LoginForm /> : loggedView()}
    </>
  );
};

export default App;
