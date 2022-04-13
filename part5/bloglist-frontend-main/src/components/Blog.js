import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const updateLikeCount = () => {
    addLike(blog)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {likes} <button onClick={() => updateLikeCount()}>like</button>
        </div>
        <div>{blog.author}</div>
        {blog.user.username === user.username && (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
