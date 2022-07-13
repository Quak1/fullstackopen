import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CommentList from "./CommentList";
import { fetchBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id;

  const blogs = useSelector((state) => state.blogs);
  if (!blogs) {
    dispatch(fetchBlogs());
    return null;
  }

  const blog = blogs[blogId];
  if (!blog) {
    return <p>Blog not found</p>;
  }

  let username = JSON.parse(localStorage.getItem("loggedUser")).username;

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {username === blog.user.username ? (
        <button onClick={handleRemove}>remove</button>
      ) : null}
      <CommentList comments={blog.comments} />
    </>
  );
};

export default BlogDetails;
