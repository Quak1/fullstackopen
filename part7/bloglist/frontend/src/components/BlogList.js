import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  if (!blogs) return null;

  const blogsSortedByLikes = Object.keys(blogs).sort(
    (a, b) => blogs[b].likes - blogs[a].likes
  );

  return (
    <div>
      {blogsSortedByLikes.map((id) => (
        <Blog key={id} blog={blogs[id]} />
      ))}
    </div>
  );
};

export default BlogList;
