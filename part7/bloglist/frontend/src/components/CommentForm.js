import { useState } from "react";
import { useDispatch } from "react-redux";

import { commentBlog } from "../reducers/blogReducer";

const CommentList = ({ id }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(commentBlog(id, newComment));
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newComment}
        name="Comment"
        onChange={({ target }) => setNewComment(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentList;
