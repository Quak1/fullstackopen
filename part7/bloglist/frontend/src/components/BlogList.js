import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  if (!blogs) return null;

  const handleLogout = () => {
    // TODO
    console.log("Handle logout in BlogList");
  };

  return (
    <div>
      {Object.keys(blogs).map((id) => (
        <Blog key={id} blog={blogs[id]} />
      ))}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default BlogList;
