const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findOne({});
  if (!body.title || !body.author) {
    return response.status(400).end();
  }
  body.likes = body.likes ? body.likes : 0;
  const blog = new Blog({
    likes: body.likes,
    author: body.author,
    url: body.url,
    title: body.title,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
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
