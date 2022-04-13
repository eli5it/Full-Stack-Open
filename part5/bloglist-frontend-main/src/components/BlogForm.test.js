import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm/> updates state and calls on submit', () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);
  const submitButton = screen.getByText('Create');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const titleInput = screen.getByPlaceholderText('title');

  userEvent.type(authorInput, 'Sample Author');
  userEvent.type(urlInput, 'Sample URL');
  userEvent.type(titleInput, 'Sample Title');

  const expectedDetails = {
    title: 'Sample Title',
    author: 'Sample Author',
    url: 'Sample URL',
  };

  userEvent.click(submitButton);
  expect(createBlog.mock.calls[0][0]).toStrictEqual(expectedDetails);
  expect(createBlog.mock.calls).toHaveLength(1);
});
