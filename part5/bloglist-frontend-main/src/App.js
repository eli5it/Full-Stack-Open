import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const blogFormRef = useRef();

  const sortBlogs = (blogs) => {
    console.log('anything');
    const sortedBlogs = blogs.sort((a, b) => {
      return a.likes - b.likes;
    });
    return sortedBlogs;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      const allBlogs = await blogService.getAll();
      setBlogs(sortBlogs(allBlogs));
      setUser(user);
      setUsername('');
      setPassword('');
      setSuccessMessage(`${user.username} logged on`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedBlogAppUser');
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(blogObject);
      console.log('created', createdBlog);
      setSuccessMessage(createdBlog.title + ' was succesfully created');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setBlogs(blogs.concat(createdBlog));
    } catch (exception) {
      setErrorMessage(`Cannot add blog ${blogObject.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      const deletedBlog = await blogService.deleteBlog(blogToDelete);
      console.log(deletedBlog);
      setSuccessMessage(`${blogToDelete.title} was succesfully deleted`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
    } catch {
      setErrorMessage(`Cannot delete blog ${blogToDelete.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      ></Notification>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in{' '}
            <button onClick={() => handleLogout()}>logout</button>
          </div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={blogService.addLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
