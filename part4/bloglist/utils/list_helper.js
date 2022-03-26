const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const getSubset = ({ title, author, likes }) => ({
    title,
    author,
    likes,
  });

  const reducer = (favorite, item) => {
    let newFavorite = favorite.likes > item.likes ? favorite : getSubset(item);
    return newFavorite;
  };
  return blogs.reduce(reducer, { likes: -1 });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
