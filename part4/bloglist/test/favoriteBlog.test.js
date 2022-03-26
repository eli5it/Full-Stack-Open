const listHelper = require('../utils/list_helper');

describe('favoriteBlog', () => {
  const oneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0,
    },
  ];
  const destructuredOneBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 3,
  };
  const threeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0,
    },
  ];
  const destructuredThreeBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 4,
  };
  const noBlog = [];

  test('of One blog returns that blog', () => {
    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toEqual(destructuredOneBlog);
  });
  test('of Zero blog returns empty Object', () => {
    const result = listHelper.favoriteBlog(noBlog);
    expect(result).toEqual({});
  });
  test('of 3 blogs returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(threeBlogs);
    expect(result).toEqual(destructuredThreeBlog);
  });
});
