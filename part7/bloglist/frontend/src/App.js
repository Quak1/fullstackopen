import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UserList";
import User from "./components/User";
import Home from "./components/Home";
import BlogDetails from "./components/BlogDetails";
import NavBar from "./components/NavBar";

import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errorMessage = useSelector((state) => state.notifications.error);
  const notification = useSelector((state) => state.notifications.notification);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const loggedView = () => (
    <>
      <h2>Blogs</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      <Container maxWidth="md">
        {user === null ? <LoginForm /> : loggedView()}
      </Container>
    </>
  );
};

export default App;
