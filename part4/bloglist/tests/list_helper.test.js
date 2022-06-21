const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogs = [
    {
      _id: "62b1fb94f86dd328a887d2ea",
      title: "Some blog",
      author: "An Author",
      url: "https://www.expample.com/blog/1",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(12);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(17);
  });
});
