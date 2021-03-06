import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <h2>Create New</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='title'
            id='title'
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='author'
            id='author'
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            name='url'
            id='url'
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='create-button'>
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
