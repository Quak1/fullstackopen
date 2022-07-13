import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { timedMessage } from "../utils";
import { clearUser } from "../reducers/userReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
    timedMessage(dispatch, "You have logged out!", "notification");
  };

  if (!user) return null;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        <li>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
