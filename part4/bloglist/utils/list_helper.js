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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
