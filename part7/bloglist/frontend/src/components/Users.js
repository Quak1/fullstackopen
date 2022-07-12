import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers/usersReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  if (!users) {
    dispatch(fetchUsers());
    return null;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
