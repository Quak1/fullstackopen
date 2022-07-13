import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../reducers/usersReducer";

const User = () => {
  const dispatch = useDispatch();
  const userId = useParams().id;

  const users = useSelector((state) => state.users);
  if (!users) {
    dispatch(fetchUsers());
    return null;
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;