const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

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

describe('when there is initially one user and some blogs in the db', () => {
  let loginToken = '';
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const { password, username, name } = helper.initialUser;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    let blogs = helper.initialBlogs;
    blogs[0].user = savedUser._id;
    const blogObjects = blogs.map((blog) => new Blog(blog));
    const blogIDs = blogObjects.map((blog) => blog._id);
    savedUser.blogs = blogIDs;
    const result = await api
      .post('/api/login')
      .send({ username: username, password: password });
    loginToken = result.body.token;
    loginToken = 'bearer ' + loginToken;
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });
  test('creation fails with propercode for non-unique username', async () => {
    const newUser = {
      username: 'Eli',
      name: 'Superuser',
      password: 'Dont let me through',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', loginToken)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');
  });
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
      .set('Authorization', loginToken)
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
      .set('Authorization', loginToken)
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
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', loginToken)
      .expect(400);
  });
  test('blog can not be added without authorization', async () => {});
  test('a blog can be deleted from db', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', loginToken)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
