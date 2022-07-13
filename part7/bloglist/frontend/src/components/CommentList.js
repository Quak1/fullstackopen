const CommentList = ({ comments }) => {
  if (!comments.length) return <h3>No comments</h3>;

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
