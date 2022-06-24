import { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(true);
  let username = JSON.parse(window.localStorage.getItem("loggedUser")).username;

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1,
    };

    likeBlog(updatedBlog, blog.id);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  if (showDetails) {
    return (
      <div className="blogDetails">
        <div>
          {blog.title} by {blog.author}{" "}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {username === blog.user.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(true)}>view</button>
    </div>
  );
};

export default Blog;

