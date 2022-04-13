import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders only title and author', () => {
  const blog = {
    title: 'Hello Dolly',
    author: 'Elijah Davis',
    url: 'https://fullstackopen.com/en/',
    likes: 69,
    user: {
      username: 'Sample username',
    },
  };
  const user = {
    username: 'Elijah Davis',
  };

  const { container } = render(<Blog blog={blog} user={user}></Blog>);

  const element = container.querySelector('.authorTitle');
  const invisibleElement = container.querySelector('.showWhenVisible');
  expect(element).toBeDefined();
  expect(invisibleElement).toBeNull();
});
