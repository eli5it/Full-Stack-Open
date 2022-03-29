const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blogObject = { ...request.body };
  if (!blogObject.likes) {
    blogObject.likes = 0;
  }
  const blog = new Blog(blogObject);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
