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
  const [blogFormVisible, setBlogFormVisible] = useState(false);

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
      setBlogs(allBlogs);
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

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}></BlogForm>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
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
            <Blog key={blog.id} blog={blog} addLike={blogService.addLike} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
