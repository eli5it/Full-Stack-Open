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

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('Astral Codex Ten');
});

test('likes property defaults to zero', async () => {
  const newBlog = {
    title: 'Astral Codex Ten',
    author: 'Scott Alexander',
    url: 'https://astralcodexten.substack.com/',
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogObject = result.body;
  expect(blogObject.likes).toEqual(0);
});

test('invalid blog not added to db', async () => {
  const newBlog = {
    author: 'Scott Alexander',
    likes: 69,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
});
test('a blog can be deleted from db', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});
test('a blog can be updated', async () => {
  const allBlogs = await helper.blogsInDb();
  const sampleBlog = allBlogs[0];
  sampleBlog.likes = 125;
  const updatedBlog = await api
    .put(`/api/blogs/${sampleBlog.id}`)
    .send(sampleBlog)
    .expect('Content-Type', /application\/json/);

  const processedBlog = JSON.parse(JSON.stringify(sampleBlog));

  expect(updatedBlog.body).toEqual(processedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
