const jwt = require("jsonwebtoken");

const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    ...request.body,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const userid = decodedToken.id;
  const user = await User.findById(userid);

  const blogid = request.params.id;

  const blog = await Blog.findById(blogid);
  if (!blog) {
    response.status(204).end();
  } else if (blog.user.toString() === userid) {
    user.blogs = user.blogs.filter((b) => b.toString() !== blogid);
    await user.save();
    await Blog.findByIdAndDelete(blogid);
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const res = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.status(200).json(res);
});

module.exports = blogRouter;
