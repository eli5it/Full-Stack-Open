import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationReducer";
import blogs from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const notification = useSelector(({ notifications }) => notifications);
  const dispatch = useDispatch();

  const blogFormRef = React.createRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getAllBlogs();
      dispatch(initializeBlogs());
    }
  }, []);

  const stateBlogs = useSelector(({ blogs }) => blogs);
  console.log(stateBlogs);

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll();
    setAllBlogs(blogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(BlogToAdd);
      dispatch(
        setNotification(
          `Blog ${BlogToAdd.title} was successfully added`,
          "success"
        )
      );
      setAllBlogs(allBlogs.concat(createdBlog));

      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification(`Cannot add blog ${BlogToAdd.title}`, "error"));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate);
      dispatch(
        setNotification(
          `Blog ${BlogToUpdate.title} was successfully updated`,
          "success"
        )
      );
      setAllBlogs(
        allBlogs.map((blog) =>
          blog.id !== BlogToUpdate.id ? blog : updatedBlog
        )
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (exception) {
      dispatch(
        setNotification(`Cannot update blog ${BlogToUpdate.title}`, "error")
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService.remove(BlogToDelete.id);
        dispatch(
          setNotification(
            `Blog ${BlogToDelete.title} was successfully deleted`,
            "success"
          )
        );
        setAllBlogs(allBlogs.filter((blog) => blog.id !== BlogToDelete.id));
        setTimeout(() => {
          dispatch(clearNotification());
        }, 5000);
      }
    } catch (exception) {
      dispatch(
        setNotification(`Cannot delete blog ${BlogToDelete.title}`, "error")
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        errorMessage={notification.errorMessage}
        successMessage={notification.successMessage}
      />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout} type="submit">
              logout
            </button>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {allBlogs.sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
