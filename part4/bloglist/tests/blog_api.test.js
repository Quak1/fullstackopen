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

  console.log(res.body[0]);
  expect(id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
