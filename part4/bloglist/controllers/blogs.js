const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (!body.title || !body.author) {
    return response.status(400).end();
  }
  body.likes = body.likes ? body.likes : 0;
  const blog = new Blog({
    likes: body.likes,
    author: body.author,
    url: body.url,
    title: body.title,
    user: request.user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  console.log(user.blogs);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  const user = request.user;
  if (blogToDelete.user.toString() === user._id.toString()) {
    blogToDelete.remove();
    return response.status(204).end();
  }
  return response.status(400).json({ error: 'token missing or invalid' });
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  console.log(blog);
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
