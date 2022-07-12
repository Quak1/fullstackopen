import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { timedMessage } from "../utils";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  let username = JSON.parse(localStorage.getItem("loggedUser")).username;

  const handleLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(likedBlog));
    timedMessage(dispatch, "You liked a post!", "notification");
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
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
    <div className="blogOutline">
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(true)}>view</button>
    </div>
  );
};

export default Blog;
