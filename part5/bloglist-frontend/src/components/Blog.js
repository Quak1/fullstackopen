import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <div className="blogDetails">
        <div>
          {blog.title} by {blog.author}{" "}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button onClick={() => console.log("liked!")}>like</button>
        </div>
        <div>{blog.user.name}</div>
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

