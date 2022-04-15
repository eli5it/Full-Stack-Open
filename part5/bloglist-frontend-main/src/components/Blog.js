import { useState } from 'react';

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  console.log('blog user', blog);
  console.log('user', user);
  const [visible, setVisibility] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const buttonLabel = visible ? 'hide' : 'view';
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  const updateLikeCount = () => {
    addLike(blog);
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      <div className='authorTitle'>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility} className='Toggle-Visibility'>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        <div>{blog.url}</div>
        <div>
          likes {likes}{' '}
          <button
            onClick={() => updateLikeCount()}
            className={'Increment-Likes'}
          >
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {blog.name === user.author && (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
