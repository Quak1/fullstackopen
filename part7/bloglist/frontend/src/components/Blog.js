import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blogOutline">
      <Link to={`blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
