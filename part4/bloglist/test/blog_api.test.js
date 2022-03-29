const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('id property is defined', async () => {
    const contents = await Blog.find({});
    const newContents = contents.map((blog) => blog.toJSON());
    const potentialID = newContents[0].id;
    expect(potentialID).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Astral Codex Ten',
    author: 'Scott Alexander',
    likes: '420',
    url: 'https://astralcodexten.substack.com/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsinDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('Astral Codex Ten');
});

afterAll(() => {
  mongoose.connection.close();
});
