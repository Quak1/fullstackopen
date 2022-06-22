const mongoose = require("mongoose");
const supertest = require("supertest");

const helper = require("./test_helper");
const Blog = require("../models/blog");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 7 entries", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(7);
});

test("a given title is returned", async () => {
  const res = await api.get("/api/blogs");
  const blogs = res.body.map((b) => b.title);

  expect(blogs).toContain("React patterns");
});

test("the unique identifier property is named id", async () => {
  const res = await api.get("/api/blogs");
  const id = res.body[0].id;

  expect(id).toBeDefined();
});

test("a blog can be added", async () => {
  const newEntry = {
    title: "POST test",
    author: "Test",
    url: "https://example.com",
    likes: 10,
  };

  const res = await api.post("/api/blogs").send(newEntry);
  expect(res.headers["content-type"]).toMatch(/json/);
  expect(res.status).toEqual(201);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogs = blogsAtEnd.map((b) => b.title);
  expect(blogs).toContain("POST test");
});

test("if likes is missing, it defaults to 0", async () => {
  const newEntry = {
    title: "POST test",
    author: "Test",
    url: "https://example.com",
  };

  const res = await api.post("/api/blogs").send(newEntry);

  console.log(res.body);
  expect(res.body.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
