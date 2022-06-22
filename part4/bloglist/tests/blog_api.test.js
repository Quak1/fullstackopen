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

describe("view all blogs", () => {
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
});

describe("addition of a new entry", () => {
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
    expect(res.body.likes).toBe(0);
  });

  test("if title or url are missing, receive status code 400", async () => {
    const newEntry = {
      author: "Test",
      likes: 10,
    };

    const res = await api.post("/api/blogs").send(newEntry);
    expect(res.status).toEqual(400);
  });
});

describe("deletetion of a note", () => {
  test("successful deletion with valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const res = await api.delete(`/api/blogs/${blogToDelete.id}`);
    expect(res.status).toBe(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 404 if id is invalid", async () => {
    const res = await api.delete("/api/blogs/123");
    expect(res.status).toBe(400);
  });
});

describe("update an existing note", () => {
  test("succeeds with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateObject = {
      likes: blogToUpdate.likes + 1,
    };

    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateObject);
    expect(res.status).toBe(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(updateObject.likes);
  });

  test("fails with status code 404 if data is invalid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateObject = {
      likes: "five",
    };

    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateObject);
    expect(res.status).toBe(400);
  });

  test("fails with status code 404 if id is invalid", async () => {
    const res = await api.put("/api/blogs/123").send({});
    expect(res.status).toBe(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
