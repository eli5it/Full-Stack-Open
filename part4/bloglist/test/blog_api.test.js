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

test('blogs are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('id property is defined', async () => {
  const contents = await Blog.find({});
  const newContents = contents.map((blog) => blog.toJSON());
  const potentialID = newContents[0].id;
  expect(potentialID).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
