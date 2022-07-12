import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  if (!blogs) return null;

  const blogsSortedByLikes = Object.keys(blogs).sort(
    (a, b) => blogs[b].likes - blogs[a].likes
  );

  const handleLogout = () => {
    // TODO
    console.log("Handle logout in BlogList");
  };

  return (
    <div>
      {blogsSortedByLikes.map((id) => (
        <Blog key={id} blog={blogs[id]} />
      ))}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default BlogList;
