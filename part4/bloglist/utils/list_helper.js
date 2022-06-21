const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => {
        return total + blog.likes;
      }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((currentFavorite, blog) => {
        if (currentFavorite.likes >= blog.likes) {
          return currentFavorite;
        } else {
          return blog;
        }
      });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  let blogsCount = {};
  blogs.map((blog) => {
    author = blog.author;
    count = blogsCount[author];
    blogsCount[author] = count ? count + 1 : 1;
  });

  const key = Object.keys(blogsCount).reduce((prev, curr) =>
    blogsCount[prev] >= blogsCount[curr] ? prev : curr
  );

  return {
    author: key,
    blogs: blogsCount[key],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
