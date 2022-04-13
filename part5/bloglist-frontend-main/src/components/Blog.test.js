import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const mockHandler = jest.fn();

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

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} addLike={mockHandler}></Blog>
    ).container;
  });
  test('renders only title and author', () => {
    const element = container.querySelector('.authorTitle');
    const invisibleElement = container.querySelector('.showWhenVisible');
    expect(element).toBeDefined();
    expect(invisibleElement).toHaveStyle('display: none');
  });
  test('render likes and url after button click', () => {
    const button = container.querySelector('.Toggle-Visibility');
    userEvent.click(button);

    const visibleElement = container.querySelector('.showWhenVisible');
    expect(visibleElement).toHaveStyle('display: block');
  });

  test('clicking button twice calls event handler twice', async () => {
    const button = container.querySelector('.Increment-Likes');
    userEvent.click(button);
    userEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
