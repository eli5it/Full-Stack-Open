import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false);
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

  const addLike = () => {
    console.log('adding like at some point');
  };
  console.log(blog);
  return (
    <div>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
